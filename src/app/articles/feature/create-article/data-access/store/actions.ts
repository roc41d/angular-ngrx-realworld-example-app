import { createActionGroup, props } from '@ngrx/store';
import { ArticleRequest } from '../../../../interfaces/article-request';
import { Article } from '../../../../../shared/interfaces/article';
import { BackendErrors } from '../../../../../shared/interfaces/backend-errors';

export const createArticleActions = createActionGroup({
  source: 'create article',
  events: {
    'Create article': props<{ request: ArticleRequest }>(),
    'Create article success': props<{ article: Article }>(),
    'Create article failure': props<{ errors: BackendErrors }>(),
  },
});
