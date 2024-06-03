import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthState } from '../../interfaces/auth-state';
import { authActions } from './actions';
import { routerNavigationAction } from '@ngrx/router-store';

const initialState: AuthState = {
  isSubmitting: false,
  currentUser: undefined,
  isLoading: false,
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
    on(authActions.login, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    on(authActions.loginSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser,
    })),
    on(authActions.loginFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),
    on(authActions.getCurrentUser, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(authActions.getCurrentUserSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      currentUser: action.currentUser,
    })),
    on(authActions.getCurrentUserFailure, (state) => ({
      ...state,
      isLoading: false,
      currentUser: null,
    })),
    on(authActions.updateCurrentUserSuccess, (state, action) => ({
      ...state,
      currentUser: action.currentUser,
    })),
    on(authActions.logout, (state) => ({
      ...state,
      ...initialState,
      currentUser: null,
    })),
    on(routerNavigationAction, (state) => ({
      ...state,
      validationErrors: null,
    })), // clear navigation errors on router change
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmitting,
  selectCurrentUser,
  selectIsLoading,
  selectValidationErrors,
} = authFeature;
