import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ArticlesService } from '../../../../data-access/articles.service';
import { articleActions } from './actions';
import { catchError, map, of, switchMap } from 'rxjs';

export const getArticleEffect = createEffect(
  (actions$ = inject(Actions), articleService = inject(ArticlesService)) => {
    return actions$.pipe(
      ofType(articleActions.getArticle),
      switchMap(({ slug }) => {
        return articleService.getArticle(slug).pipe(
          map((article) => articleActions.getArticleSuccess({ article })),
          catchError(() => of(articleActions.getArticleFailure())),
        );
      }),
    );
  },
  { functional: true },
);
