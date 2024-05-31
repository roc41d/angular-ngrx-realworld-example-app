import { BackendErrors } from '../../shared/interfaces/backend-errors';
import { CurrentUser } from '../../shared/interfaces/current-user';

export interface AuthState {
  isSubmitting: boolean;
  currentUser: CurrentUser | null | undefined;
  isLoggedIn: boolean;
  validationErrors: BackendErrors | null;
}
