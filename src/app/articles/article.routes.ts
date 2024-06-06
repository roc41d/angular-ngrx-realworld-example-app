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
import {
  createArticleFeatureKey,
  createArticleReducer,
} from './feature/create-article/data-access/store/reducers';
import * as createArticleEffects from './feature/create-article/data-access/store/effects';
import { EditArticleComponent } from './feature/edit-article/edit-article.component';
import {
  editArticleFeatureKey,
  editArticleReducer,
} from './feature/edit-article/data-access/store/reducers';
import * as editArticleEffects from './feature/edit-article/data-access/store/effects';
import {
  commentFeatureKey,
  commentReducer,
} from './feature/comments/feature/comment-list/data-access/store/reducers';
import * as commentsEffect from './feature/comments/feature/comment-list/data-access/store/effects';
import {
  addCommentFeatureKey,
  addCommentReducer,
} from './feature/comments/feature/add-comment/data-access/store/reducers';
import * as addCommentsEffect from './feature/comments/feature/add-comment/data-access/store/effects';

export const articleRoutes: Route[] = [
  {
    path: '',
    component: ArticleComponent,
    providers: [
      provideEffects(articleEffects, commentsEffect, addCommentsEffect),
      provideState(articleFeatureKey, articleReducer),
      provideState(commentFeatureKey, commentReducer),
      provideState(addCommentFeatureKey, addCommentReducer),
    ],
  },
];

export const createArticleRoutes: Route[] = [
  {
    path: '',
    component: CreateArticleComponent,
    providers: [
      provideEffects(createArticleEffects),
      provideState(createArticleFeatureKey, createArticleReducer),
    ],
  },
];

export const editArticleRoutes: Route[] = [
  {
    path: '',
    component: EditArticleComponent,
    providers: [
      provideEffects(editArticleEffects),
      provideState(editArticleFeatureKey, editArticleReducer),
    ],
  },
];
