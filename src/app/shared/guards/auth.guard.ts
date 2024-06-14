import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../auth/data-access/store/reducers';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  const currentUser = store.selectSignal(selectCurrentUser);

  if (currentUser()) {
    return true;
  }

  return router.parseUrl('login');
};
