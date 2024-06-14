import { createFeature, createReducer, on } from '@ngrx/store';
import { CommentState } from '../../interfaces/comment-state';
import { commentActions } from './actions';

const initialState: CommentState = {
  isLoading: false,
  isSubmitting: false,
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
    on(commentActions.addComment, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(commentActions.addCommentSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      data: state.data ? [...state.data, action.comment] : [action.comment],
    })),
    on(commentActions.addCommentFailure, (state) => ({
      ...state,
      isSubmitting: false,
    })),
    on(commentActions.deleteComment, (state) => ({
      ...state,
    })),
    on(commentActions.deleteCommentSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: state.data
        ? state.data.filter((comment) => comment.id !== action.commentId)
        : [],
    })),
    on(commentActions.deleteCommentFailure, (state) => ({
      ...state,
      isLoading: false,
    })),
  ),
});

export const {
  name: commentFeatureKey,
  reducer: commentReducer,
  selectIsLoading,
  selectIsSubmitting,
  selectError,
  selectData: selectCommentData,
} = commentFeature;
