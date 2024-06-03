import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CurrentUser } from '../shared/interfaces/current-user';
import { combineLatest } from 'rxjs';
import {
  selectIsSubmitting,
  selectValidationErrors,
} from './data-access/store/reducers';
import { selectCurrentUser } from '../auth/data-access/store/reducers';
import { UpdateUserFormComponent } from './ui/update-user-form/update-user-form.component';
import { AsyncPipe } from '@angular/common';
import { authActions } from '../auth/data-access/store/actions';
import { CurrentUserRequest } from '../shared/interfaces/current-user-request';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [AsyncPipe, UpdateUserFormComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  private store = inject(Store);

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
    currentUser: this.store.select(selectCurrentUser),
  });

  onSubmit(currentUserRequest: CurrentUserRequest): void {
    this.store.dispatch(authActions.updateCurrentUser({ currentUserRequest }));
  }

  logout(): void {
    this.store.dispatch(authActions.logout());
  }
}
