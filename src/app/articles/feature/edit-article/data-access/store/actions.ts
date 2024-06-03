import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { Article } from '../../../../../shared/interfaces/article';
import { BackendErrors } from '../../../../../shared/interfaces/backend-errors';
import { ArticleRequest } from '../../../../interfaces/article-request';

export const editArticleActions = createActionGroup({
  source: 'update article',
  events: {
    'Get article': props<{ slug: string }>(),
    'Get article success': props<{ article: Article }>(),
    'Get article failure': emptyProps(),

    'Update article': props<{ request: ArticleRequest; slug: string }>(),
    'Update article success': props<{ article: Article }>(),
    'Update article failure': props<{ errors: BackendErrors }>(),
  },
});
