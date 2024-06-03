import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { AddToFavoritesService } from '../add-to-favorites.service';
import { addToFavoritesActions } from './actions';

export const addToFavoritesEffect = createEffect(
  (
    actions$ = inject(Actions),
    addToFavoritesService = inject(AddToFavoritesService),
  ) => {
    return actions$.pipe(
      ofType(addToFavoritesActions.addToFavorites),
      switchMap(({ isFavorited, slug }) => {
        const article$ = isFavorited
          ? addToFavoritesService.removeFromFavorites(slug)
          : addToFavoritesService.addToFavorites(slug);
        return article$.pipe(
          map((article) =>
            addToFavoritesActions.addToFavoritesSuccess({ article }),
          ),
          catchError(() => of(addToFavoritesActions.addToFavoritesFailure())),
        );
      }),
    );
  },
  { functional: true },
);
