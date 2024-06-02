import { Article } from '../../../../shared/interfaces/article';

export interface ArticleState {
  isLoading: boolean;
  error: string | null;
  data: Article | null;
}
