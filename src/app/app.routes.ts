import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import {
  settingsFeatureKey,
  settingsReducer,
} from './settings/data-access/store/reducers';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./auth/auth.routes').then((m) => m.registerRoutes),
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.loginRoutes),
  },
  {
    path: 'feed',
    loadComponent: () =>
      import('./your-feed/your-feed.component').then(
        (m) => m.YourFeedComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'tags/:slug',
    loadComponent: () =>
      import('./tag-feed/tag-feed.component').then((m) => m.TagFeedComponent),
  },
  {
    path: 'articles/new',
    loadChildren: () =>
      import('./articles/article.routes').then((m) => m.createArticleRoutes),
    canActivate: [authGuard],
  },
  {
    path: 'articles/:slug',
    loadChildren: () =>
      import('./articles/article.routes').then((m) => m.articleRoutes),
  },
  {
    path: 'articles/:slug/edit',
    loadChildren: () =>
      import('./articles/article.routes').then((m) => m.editArticleRoutes),
    canActivate: [authGuard],
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./settings/settings.component').then((m) => m.SettingsComponent),
    providers: [provideState(settingsFeatureKey, settingsReducer)],
    canActivate: [authGuard],
  },
  {
    path: 'profiles/:username',
    loadChildren: () =>
      import('./user-profile/user-profile.routes').then((m) => m.routes),
  },
  {
    path: 'profiles/:username/favorites',
    loadChildren: () =>
      import('./user-profile/user-profile.routes').then((m) => m.routes),
  },
];
