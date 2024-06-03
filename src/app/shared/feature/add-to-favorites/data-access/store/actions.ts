import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Article } from '../../../../interfaces/article';

export const addToFavoritesActions = createActionGroup({
  source: 'Add to favorites',
  events: {
    'Add to favorites': props<{ isFavorited: boolean; slug: string }>(),
    'Add to favorites success': props<{ article: Article }>(),
    'Add to favorites failure': emptyProps(),
  },
});
