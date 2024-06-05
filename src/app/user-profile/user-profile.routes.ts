import { Route } from '@angular/router';
import { UserProfileComponent } from './user-profile.component';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { userProfileFeatureKey, userProfileReducer } from './data-access/store/reducers';
import * as userProfileEffect from './data-access/store/effects';

export const routes: Route[] = [
  {
    path: '',
    component: UserProfileComponent,
    providers: [
        provideState(userProfileFeatureKey, userProfileReducer),
        provideEffects(userProfileEffect),
      ],
  },
];
