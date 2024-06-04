import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { FollowUserService } from '../follow-user.service';
import { followUserActions } from './actions';

export const followUserEffect = createEffect(
  (
    actions$ = inject(Actions),
    followUserService = inject(FollowUserService),
  ) => {
    return actions$.pipe(
      ofType(followUserActions.followUser),
      switchMap(({ isFollowing, username }) => {
        const followUser$ = isFollowing
          ? followUserService.unfollowUnser(username)
          : followUserService.followUser(username);
        return followUser$.pipe(
          map((profile) => followUserActions.followUserSuccess({ profile })),
          catchError(() => of(followUserActions.followUserFailure())),
        );
      }),
    );
  },
  { functional: true },
);
