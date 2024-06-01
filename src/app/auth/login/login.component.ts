import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BackendErrorMessagesComponent } from '../../shared/feature/backend-error-messages.component';
import { Store } from '@ngrx/store';
import { selectIsSubmitting, selectValidationErrors } from '../data-access/store/reducers';
import { authActions } from '../data-access/store/actions';
import { LoginRequest } from '../interfaces/login-request';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    AsyncPipe,
    BackendErrorMessagesComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  isSubmitting$ = this.store.select(selectIsSubmitting);
  backendErrors$ = this.store.select(selectValidationErrors);

  onSubmit() {
    const request: LoginRequest = {
      user: this.form.getRawValue(),
    };
    this.store.dispatch(authActions.login({ request }));
  }

}
