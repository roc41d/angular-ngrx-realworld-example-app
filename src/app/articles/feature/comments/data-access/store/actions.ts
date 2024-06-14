import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Comment } from '../../interfaces/comment';
import { CommentRequest } from '../../interfaces/comment-request';

export const commentActions = createActionGroup({
  source: 'comment',
  events: {
    'Get comments': props<{ slug: string }>(),
    'Get comments success': props<{ comments: Comment[] }>(),
    'Get comments failure': emptyProps(),

    'Add comment': props<{ slug: string; request: CommentRequest }>(),
    'Add comment success': props<{ comment: Comment }>(),
    'Add comment failure': emptyProps(),

    'Delete comment': props<{ slug: string; commentId: number }>(),
    'Delete comment success': props<{ commentId: number }>(),
    'Delete comment failure': emptyProps(),
  },
});
