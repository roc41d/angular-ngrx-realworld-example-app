import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { ArticlesService } from '../../../../data-access/articles.service';
import { commentActions } from './actions';

export const getCommentsEffect = createEffect(
  (actions$ = inject(Actions), articleService = inject(ArticlesService)) => {
    return actions$.pipe(
      ofType(commentActions.getComments),
      switchMap(({ slug }) => {
        return articleService.getComments(slug).pipe(
          map((comments) => commentActions.getCommentsSuccess({ comments })),
          catchError(() => of(commentActions.getCommentsFailure())),
        );
      }),
    );
  },
  { functional: true },
);
