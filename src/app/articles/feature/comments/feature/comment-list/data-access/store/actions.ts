import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Comment } from '../../../../interfaces/comment';

export const commentActions = createActionGroup({
  source: 'comment',
  events: {
    'Get comments': props<{ slug: string }>(),
    'Get comments success': props<{ comments: Comment[] }>(),
    'Get comments failure': emptyProps(),

    'Delete comment': props<{ slug: string; commentId: number }>(),
    'Delete comment success': emptyProps(),
    'Delete comment failure': emptyProps(),
  },
});
