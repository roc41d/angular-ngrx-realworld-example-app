import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of, tap } from 'rxjs';
import { ArticlesService } from '../../../../data-access/articles.service';
import { editArticleActions } from './actions';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

export const getArticleEffect = createEffect(
  (actions$ = inject(Actions), articleService = inject(ArticlesService)) => {
    return actions$.pipe(
      ofType(editArticleActions.getArticle),
      switchMap(({ slug }) => {
        return articleService.getArticle(slug).pipe(
          map((article) => editArticleActions.getArticleSuccess({ article })),
          catchError(() => of(editArticleActions.getArticleFailure())),
        );
      }),
    );
  },
  { functional: true },
);

export const updateArticleEffect = createEffect(
  (actions$ = inject(Actions), articleService = inject(ArticlesService)) => {
    return actions$.pipe(
      ofType(editArticleActions.updateArticle),
      switchMap(({ request, slug }) => {
        return articleService.editArticle(slug, request).pipe(
          map((article) =>
            editArticleActions.updateArticleSuccess({ article }),
          ),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              editArticleActions.updateArticleFailure({
                errors: errorResponse.error.errors,
              }),
            );
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const redirectAfterUpdateEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(editArticleActions.updateArticleSuccess),
      tap(({ article }) => {
        router.navigate(['/articles', article.slug]);
      }),
    );
  },
  { functional: true, dispatch: false },
);
