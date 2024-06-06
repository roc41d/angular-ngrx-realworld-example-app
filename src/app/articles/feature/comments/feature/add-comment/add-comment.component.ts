import { Component, Input, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectIsSubmitting } from './data-access/store/reducers';
import { AsyncPipe } from '@angular/common';
import { CommentRequest } from './interfaces/comment-request';
import { addCommentActions } from './data-access/store/actions';
import { CurrentUser } from '../../../../../shared/interfaces/current-user';

@Component({
  selector: 'app-add-comment',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="card comment-form">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
          formControlName="body"
        ></textarea>
      </div>
      <div class="card-footer">
        <img [src]="currentUser.image" class="comment-author-img" />
        <button
          [disabled]="form.invalid || (isSubmitting$ | async)"
          class="btn btn-sm btn-primary"
        >
          Post Comment
        </button>
      </div>
    </form>
  `,
})
export class AddCommentComponent {
  @Input({ required: true }) articleSlug: string = '';
  @Input({ required: true }) currentUser!: CurrentUser;

  private fb: FormBuilder = inject(FormBuilder);
  private store: Store = inject(Store);

  form = this.fb.nonNullable.group({
    body: ['', Validators.required],
  });

  isSubmitting$ = this.store.select(selectIsSubmitting);

  onSubmit() {
    const request: CommentRequest = {
      comment: this.form.getRawValue(),
    };

    this.store.dispatch(
      addCommentActions.addComment({ slug: this.articleSlug, request }),
    );
  }
}
