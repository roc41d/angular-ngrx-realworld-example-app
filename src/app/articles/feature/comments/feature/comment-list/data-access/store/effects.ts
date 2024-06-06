import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { commentActions } from './actions';
import { CommentsService } from '../../../../data-access/comments.service';

export const getCommentsEffect = createEffect(
  (actions$ = inject(Actions), commentService = inject(CommentsService)) => {
    return actions$.pipe(
      ofType(commentActions.getComments),
      switchMap(({ slug }) => {
        return commentService.getComments(slug).pipe(
          map((comments) => commentActions.getCommentsSuccess({ comments })),
          catchError(() => of(commentActions.getCommentsFailure())),
        );
      }),
    );
  },
  { functional: true },
);

export const deleteCommentEffect = createEffect(
  (actions$ = inject(Actions), commentService = inject(CommentsService)) => {
    return actions$.pipe(
      ofType(commentActions.deleteComment),
      switchMap(({ slug, commentId }) => {
        return commentService.deleteComment(slug, commentId).pipe(
          map(() => commentActions.deleteCommentSuccess()),
          catchError(() => of(commentActions.deleteCommentFailure())),
        );
      }),
    );
  },
  { functional: true },
);
