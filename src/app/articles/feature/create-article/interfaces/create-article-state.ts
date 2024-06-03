import { BackendErrors } from '../../../../shared/interfaces/backend-errors';

export interface CreateArticleState {
  isSubmitting: boolean;
  validationErrors: BackendErrors | null;
}
