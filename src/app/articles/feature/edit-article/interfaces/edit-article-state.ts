import { Article } from '../../../../shared/interfaces/article';
import { BackendErrors } from '../../../../shared/interfaces/backend-errors';

export interface EditArticleState {
  article: Article | null;
  isLoading: boolean;
  isSubmitting: boolean;
  validationErrors: BackendErrors | null;
}
