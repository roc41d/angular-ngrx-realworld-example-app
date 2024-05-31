import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { RegisterRequest } from '../../interfaces/register-request';
import { CurrentUser } from '../../../shared/interfaces/current-user';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register: props<{ request: RegisterRequest }>(),
    'Register success': props<{ currentUser: CurrentUser }>(),
    'Register failure': emptyProps(),
  },
});
