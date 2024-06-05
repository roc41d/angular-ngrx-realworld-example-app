import { createFeature, createReducer, on } from '@ngrx/store';
import { CommentState } from '../../interfaces/comment-state';
import { commentActions } from './actions';

const initialState: CommentState = {
  isLoading: false,
  error: null,
  data: null,
};

const commentFeature = createFeature({
  name: 'comment',
  reducer: createReducer(
    initialState,
    on(commentActions.getComments, (state) => ({ ...state, isLoading: true })),
    on(commentActions.getCommentsSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.comments,
    })),
    on(commentActions.getCommentsFailure, (state) => ({
      ...state,
      isLoading: false,
    })),
  ),
});

export const {
  name: commentFeatureKey,
  reducer: commentReducer,
  selectIsLoading,
  selectError,
  selectData: selectCommentData,
} = commentFeature;
