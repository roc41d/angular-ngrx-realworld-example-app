import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthState } from '../../interfaces/auth-state';
import { authActions } from './actions';

const initialState: AuthState = {
  isSubmitting: false,
  currentUser: undefined,
  isLoggedIn: false,
  validationErrors: null,
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.register, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    on(authActions.registerSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser,
    })),
    on(authActions.registerFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmitting,
  selectCurrentUser,
  selectIsLoggedIn,
  selectValidationErrors,
} = authFeature;
