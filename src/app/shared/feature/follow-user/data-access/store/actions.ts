import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { Profile } from '../../../../interfaces/profile';

export const followUserActions = createActionGroup({
  source: 'Follow User',
  events: {
    'Follow user': props<{ isFollowing: boolean; username: string }>(),
    'Follow user success': props<{ profile: Profile }>(),
    'Follow user failure': emptyProps(),
  },
});
