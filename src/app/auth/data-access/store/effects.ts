import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../auth.service';
import { inject } from '@angular/core';
import { catchError, map, of, switchMap } from 'rxjs';
import { authActions } from './actions';
import { HttpErrorResponse } from '@angular/common/http';

export const registerEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(authActions.register),
      switchMap(({ request }) =>
        authService.register(request).pipe(
          map((currentUser) => authActions.registerSuccess({ currentUser })),
          catchError((errorResp: HttpErrorResponse) =>
            of(authActions.registerFailure({ errors: errorResp.error.errors })),
          ),
        ),
      ),
    );
  },
  { functional: true },
);
