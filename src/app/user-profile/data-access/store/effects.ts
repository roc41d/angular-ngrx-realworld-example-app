import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { UserProfileService } from '../user-profile.service';
import { userProfileActions } from './actions';

export const getUserProfileEffect = createEffect(
  (
    actions$ = inject(Actions),
    userProfileService = inject(UserProfileService),
  ) => {
    return actions$.pipe(
      ofType(userProfileActions.getUserProfile),
      switchMap(({ slug }) => {
        return userProfileService.getUserProfile(slug).pipe(
          map((userProfile) =>
            userProfileActions.getUserProfileSuccess({ userProfile }),
          ),
          catchError(() => of(userProfileActions.getUserProfileFailure())),
        );
      }),
    );
  },
  { functional: true },
);
