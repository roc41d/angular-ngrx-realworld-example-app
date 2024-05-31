import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../auth.service';
import { inject } from '@angular/core';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { authActions } from './actions';
import { HttpErrorResponse } from '@angular/common/http';
import { PersistanceService } from '../../../shared/data-access/persistance.service';
import { Router } from '@angular/router';

export const registerEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService),
  ) => {
    return actions$.pipe(
      ofType(authActions.register),
      switchMap(({ request }) =>
        authService.register(request).pipe(
          map((currentUser) => {
            persistanceService.set('accessToken', currentUser.token);
            return authActions.registerSuccess({ currentUser });
          }),
          catchError((errorResp: HttpErrorResponse) =>
            of(authActions.registerFailure({ errors: errorResp.error.errors })),
          ),
        ),
      ),
    );
  },
  { functional: true },
);

export const redirectAfterRegisterEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.registerSuccess),
      tap(() => {
        router.navigateByUrl('/');
      }),
    );
  },
  { functional: true, dispatch: false },
);

export const loginEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService),
  ) => {
    return actions$.pipe(
      ofType(authActions.login),
      switchMap(({ request }) => {
        return authService.login(request).pipe(
          map((currentUser) => {
            persistanceService.set('accessToken', currentUser.token);
            return authActions.loginSuccess({ currentUser });
          }),
          catchError((errorResp: HttpErrorResponse) =>
            of(authActions.loginFailure({ errors: errorResp.error.errors })),
          ),
        );
      }),
    );
  },
  { functional: true },
);

export const redirectAfterLoginEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.loginSuccess),
      tap(() => {
        router.navigateByUrl('/');
      }),
    );
  },
  { functional: true, dispatch: false },
);

export const getCurrentUserEffect = createEffect(
    (
      actions$ = inject(Actions),
      authService = inject(AuthService),
      persistanceService = inject(PersistanceService)
    ) => {
      return actions$.pipe(
        ofType(authActions.getCurrentUser),
        switchMap(() => {
          const token = persistanceService.get('accessToken')
  
          if (!token) {
            return of(authActions.getCurrentUserFailure())
          }
          return authService.getCurrentUser().pipe(
            map((currentUser) => {
              return authActions.getCurrentUserSuccess({currentUser})
            }),
            catchError(() => {
              return of(authActions.getCurrentUserFailure())
            })
          )
        })
      )
    },
    {functional: true}
  )
