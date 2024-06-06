import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CommentsService } from '../../../../data-access/comments.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { addCommentActions } from './actions';

export const addCommentsEffect = createEffect(
  (actions$ = inject(Actions), commentService = inject(CommentsService)) => {
    return actions$.pipe(
      ofType(addCommentActions.addComment),
      switchMap(({ slug, request }) => {
        return commentService.addComment(slug, request).pipe(
          map((comment) => addCommentActions.addCommentSuccess({ comment })),
          catchError(() => of(addCommentActions.addCommentFailure())),
        );
      }),
    );
  },
  { functional: true },
);
