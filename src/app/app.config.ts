import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideState, provideStore } from '@ngrx/store';
import { provideRouterStore } from '@ngrx/router-store';
import { routes } from './app.routes';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authFeatureKey, authReducer } from './auth/data-access/store/reducers';
import * as authEffects from './auth/data-access/store/effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { authInterceptor } from './shared/data-access/authInterceptor';
import {
  feedFeatureKey,
  feedReducer,
} from './shared/feature/feed/data-acess/store/reducers';
import * as feedEffect from './shared/feature/feed/data-acess/store/effects';
import {
  popularTagsFeatureKey,
  popularTagsReducer,
} from './shared/feature/popular-tags/data-access/store/reducers';
import * as popularTagsEffect from './shared/feature/popular-tags/data-access/store/effects';
import * as addToFavoritesEffect from './shared/feature/add-to-favorites/data-access/store/effects';
import {
  addToFavoritesFeatureKey,
  addToFavoritesReducer,
} from './shared/feature/add-to-favorites/data-access/store/reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore(),
    provideRouterStore(),
    provideState(authFeatureKey, authReducer),
    provideState(feedFeatureKey, feedReducer),
    provideState(popularTagsFeatureKey, popularTagsReducer),
    provideState(addToFavoritesFeatureKey, addToFavoritesReducer),
    provideEffects(
      authEffects,
      feedEffect,
      popularTagsEffect,
      addToFavoritesEffect,
    ),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ],
};
