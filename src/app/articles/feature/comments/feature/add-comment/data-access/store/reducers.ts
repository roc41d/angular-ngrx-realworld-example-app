import { createFeature, createReducer, on } from '@ngrx/store';
import { AddCommentState } from '../../interfaces/add-comment-state';
import { addCommentActions } from './actions';

const initialState: AddCommentState = {
  isSubmitting: false,
};

const addCommentFeature = createFeature({
  name: 'addComment',
  reducer: createReducer(
    initialState,
    on(addCommentActions.addComment, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(addCommentActions.addCommentSuccess, (state) => ({
      ...state,
      isSubmitting: false,
    })),
    on(addCommentActions.addCommentFailure, (state) => ({
      ...state,
      isSubmitting: false,
    })),
  ),
});

export const {
  name: addCommentFeatureKey,
  reducer: addCommentReducer,
  selectIsSubmitting,
} = addCommentFeature;
