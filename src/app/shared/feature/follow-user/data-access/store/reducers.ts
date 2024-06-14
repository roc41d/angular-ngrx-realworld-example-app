import { createFeature, createReducer, on } from '@ngrx/store';
import { FollowUserState } from '../../interfaces/follow-user-state';
import { followUserActions } from './actions';

const initialState: FollowUserState = {
  isSubmitting: false,
};

const followUserFeature = createFeature({
  name: 'follow user',
  reducer: createReducer(
    initialState,
    on(followUserActions.followUser, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(followUserActions.followUserSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
    })),
    on(followUserActions.followUserFailure, (state) => ({
      ...state,
      isSubmitting: false,
    })),
  ),
});

export const {
  name: followUserFeatureKey,
  reducer: followUserReducer,
  selectIsSubmitting,
} = followUserFeature;
