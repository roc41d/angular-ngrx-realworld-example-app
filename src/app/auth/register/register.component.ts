import { RegisterRequest } from './../interfaces/register-request';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { authActions } from '../data-access/store/actions';
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../data-access/store/reducers';
import { combineLatest } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { BackendErrorMessagesComponent } from '../../shared/ui/backend-error-messages.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    AsyncPipe,
    BackendErrorMessagesComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  isSubmitting$ = this.store.select(selectIsSubmitting);
  backendErrors$ = this.store.select(selectValidationErrors);

  onSubmit() {
    const request: RegisterRequest = {
      user: this.form.getRawValue(),
    };
    this.store.dispatch(authActions.register({ request }));
  }
}
