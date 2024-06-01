import { inject } from '@angular/core';
import { FeedService } from '../feed.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { feedActions } from './actions';
import { catchError, map, of, switchMap } from 'rxjs';

export const getFeedEffect = createEffect(
  (actions$ = inject(Actions), feedService = inject(FeedService)) => {
    return actions$.pipe(
      ofType(feedActions.getFeed),
      switchMap(({ url }) => {
        return feedService.getFeed(url).pipe(
          map((feed) => feedActions.getFeedSuccess({ feed })),
          catchError(() => of(feedActions.getFeedFailure())),
        );
      }),
    );
  },
  { functional: true },
);
