import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Comment } from '../../../../interfaces/comment';
import { CommentRequest } from '../../interfaces/comment-request';

export const addCommentActions = createActionGroup({
  source: 'add comment',
  events: {
    'Add comment': props<{ slug: string; request: CommentRequest }>(),
    'Add comment success': props<{ comment: Comment }>(),
    'Add comment failure': emptyProps(),
  },
});
