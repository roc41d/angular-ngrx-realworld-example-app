import { createFeature, createReducer, on } from '@ngrx/store';
import { AddToFavoritesState } from '../../interfaces/add-to-favorites-state';
import { addToFavoritesActions } from './actions';

const initialState: AddToFavoritesState = {
  isSubmitting: false,
};

const addToFavoritesFeature = createFeature({
  name: 'add to favorites',
  reducer: createReducer(
    initialState,
    on(addToFavoritesActions.addToFavorites, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(addToFavoritesActions.addToFavoritesSuccess, (state) => ({
      ...state,
      isSubmitting: false,
    })),
    on(addToFavoritesActions.addToFavoritesFailure, (state) => ({
      ...state,
      isSubmitting: false,
    })),
  ),
});

export const {
    name: addToFavoritesFeatureKey,
    reducer: addToFavoritesReducer,
    selectIsSubmitting,
} = addToFavoritesFeature;
