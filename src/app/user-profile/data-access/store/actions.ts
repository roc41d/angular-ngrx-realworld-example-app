import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { Profile } from '../../../shared/interfaces/profile';

export const userProfileActions = createActionGroup({
  source: 'User Profile',
  events: {
    'Get user profile': props<{ username: string }>(),
    'Get user profile success': props<{ userProfile: Profile }>(),
    'Get user profile failure': emptyProps(),
  },
});
