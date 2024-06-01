import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PopularTagService } from '../popular-tag.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { PopularTagType } from '../../../../interfaces/popular-tag.type';
import { popularTagsActions } from './actions';

export const getPopularTagsEffect = createEffect(
  (
    actions$ = inject(Actions),
    popularTagsService = inject(PopularTagService),
  ) => {
    return actions$.pipe(
      ofType(popularTagsActions.getPopularTags),
      switchMap(() => {
        return popularTagsService.getPopularTags().pipe(
          map((popularTags) =>
            popularTagsActions.getPopularTagsSuccess({ popularTags }),
          ),
          catchError(() => of(popularTagsActions.getPopularTagsFailure())),
        );
      }),
    );
  },
  { functional: true },
);
