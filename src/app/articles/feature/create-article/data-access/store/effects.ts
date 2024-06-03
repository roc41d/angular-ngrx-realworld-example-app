import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of, tap } from 'rxjs';
import { createArticleActions } from './actions';
import { Article } from '../../../../../shared/interfaces/article';
import { ArticlesService } from '../../../../data-access/articles.service';
import { Router } from '@angular/router';

export const createArticleEffect = createEffect(
  (actions$ = inject(Actions), articleService = inject(ArticlesService)) => {
    return actions$.pipe(
      ofType(createArticleActions.createArticle),
      switchMap(({ request }) => {
        return articleService.createArticle(request).pipe(
          map((article: Article) =>
            createArticleActions.createArticleSuccess({ article }),
          ),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              createArticleActions.createArticleFailure({
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

export const redirectAfterCreateEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(createArticleActions.createArticleSuccess),
      tap(({ article }) => {
        router.navigate(['/articles', article.slug]);
      }),
    );
  },
  { functional: true, dispatch: false },
);
