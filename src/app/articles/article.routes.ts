import { Route } from '@angular/router';
import { ArticleComponent } from './feature/article/article.component';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import {
  articleFeatureKey,
  articleReducer,
} from './feature/article/data-access/store/reducers';
import * as articleEffects from './feature/article/data-access/store/effects';

export const routes: Route[] = [
  {
    path: '',
    component: ArticleComponent,
    providers: [
      provideEffects(articleEffects),
      provideState(articleFeatureKey, articleReducer),
    ],
  },
];
