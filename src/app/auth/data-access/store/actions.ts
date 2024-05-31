import { createAction, props } from '@ngrx/store';
import { RegisterRequest } from '../../interfaces/register-request';

export const register = createAction(
  '[Auth] Register',
  props<{ request: RegisterRequest }>(),
);
