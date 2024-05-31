import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { RegisterRequest } from '../../interfaces/register-request';
import { CurrentUser } from '../../../shared/interfaces/current-user';
import { BackendErrors } from '../../../shared/interfaces/backend-errors';
import { LoginRequest } from '../../interfaces/login-request';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register: props<{ request: RegisterRequest }>(),
    'Register success': props<{ currentUser: CurrentUser }>(),
    'Register failure': props<{ errors: BackendErrors }>(),

    Login: props<{ request: LoginRequest }>(),
    'Login success': props<{ currentUser: CurrentUser }>(),
    'Login failure': props<{ errors: BackendErrors }>(),

    'Get current user': emptyProps(),
    'Get current user success': props<{currentUser: CurrentUser}>(),
    'Get current user failure': emptyProps(),
  },
});
