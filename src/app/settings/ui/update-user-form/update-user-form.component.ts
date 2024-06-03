import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { BackendErrors } from '../../../shared/interfaces/backend-errors';
import { CurrentUser } from '../../../shared/interfaces/current-user';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BackendErrorMessagesComponent } from '../../../shared/feature/backend-error-messages.component';
import { CurrentUserRequest } from '../../../shared/interfaces/current-user-request';

@Component({
  selector: 'app-update-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, BackendErrorMessagesComponent],
  templateUrl: './update-user-form.component.html',
  styleUrl: './update-user-form.component.scss',
})
export class UpdateUserFormComponent implements OnInit {
  private fb = inject(FormBuilder);

  @Input() currentUser!: CurrentUser;
  @Input() isSubmitting: boolean = false;
  @Input() errors: BackendErrors | null = null;

  @Output() userSubmit = new EventEmitter<CurrentUserRequest>();

  form = this.fb.nonNullable.group({
    image: '',
    username: ['', Validators.required],
    bio: '',
    email: ['', Validators.required],
    password: '',
  });

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    if (!this.currentUser) {
      throw new Error('current user is not set');
    }
    this.form.patchValue({
      image: this.currentUser.image ?? '',
      username: this.currentUser.username,
      bio: this.currentUser.bio ?? '',
      email: this.currentUser.email,
      password: '',
    });
  }

  onSubmit() {
    const currentUserRequest: CurrentUserRequest = {
      user: {
        ...this.currentUser,
        ...this.form.getRawValue(),
      },
    };
    this.userSubmit.emit(currentUserRequest);
  }
}
