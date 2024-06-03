import { Routes } from '@angular/router';

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
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./settings/settings.component').then((m) => m.SettingsComponent),
  },
];
