import { Route } from '@angular/router';
import { ArticleComponent } from './feature/article/article.component';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import {
  articleFeatureKey,
  articleReducer,
} from './feature/article/data-access/store/reducers';
import * as articleEffects from './feature/article/data-access/store/effects';
import { CreateArticleComponent } from './feature/create-article/create-article.component';

export const articleRoutes: Route[] = [
  {
    path: '',
    component: ArticleComponent,
    providers: [
      provideEffects(articleEffects),
      provideState(articleFeatureKey, articleReducer),
    ],
  },
];

export const createArticleRoutes: Route[] = [
  {
    path: '',
    component: CreateArticleComponent,
  },
];
