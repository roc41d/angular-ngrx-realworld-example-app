import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { CommentsService } from '../comments.service';
import { commentActions } from './actions';

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

export const addCommentsEffect = createEffect(
  (actions$ = inject(Actions), commentService = inject(CommentsService)) => {
    return actions$.pipe(
      ofType(commentActions.addComment),
      switchMap(({ slug, request }) => {
        return commentService.addComment(slug, request).pipe(
          map((comment) => commentActions.addCommentSuccess({ comment })),
          catchError(() => of(commentActions.addCommentFailure())),
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
          map(() => commentActions.deleteCommentSuccess({ commentId })),
          catchError(() => of(commentActions.deleteCommentFailure())),
        );
      }),
    );
  },
  { functional: true },
);
