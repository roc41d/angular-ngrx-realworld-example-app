import { BackendErrors } from '../../shared/interfaces/backend-errors';

export interface SettingsState {
  isSubmitting: boolean;
  validationErrors: BackendErrors | null;
}
