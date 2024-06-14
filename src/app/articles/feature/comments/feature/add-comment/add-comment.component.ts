import { Component, Input, OnDestroy, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActionsSubject, Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { CommentRequest } from '../../interfaces/comment-request';
import { CurrentUser } from '../../../../../shared/interfaces/current-user';
import { commentActions } from '../../data-access/store/actions';
import { selectIsSubmitting } from '../../data-access/store/reducers';
import { Subject, filter, takeUntil } from 'rxjs';

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
export class AddCommentComponent implements OnDestroy {
  @Input({ required: true }) articleSlug: string = '';
  @Input({ required: true }) currentUser!: CurrentUser;

  private fb: FormBuilder = inject(FormBuilder);
  private store: Store = inject(Store);
  private actionsSubj: ActionsSubject = inject(ActionsSubject);
  private destroy$ = new Subject<void>();

  form = this.fb.nonNullable.group({
    body: ['', Validators.required],
  });

  isSubmitting$ = this.store.select(selectIsSubmitting);

  constructor() {
    this.actionsSubj
      .pipe(
        filter(
          (action) => action.type === commentActions.addCommentSuccess.type,
        ),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.form.reset();
      });
  }

  onSubmit() {
    const request: CommentRequest = {
      comment: this.form.getRawValue(),
    };

    this.store.dispatch(
      commentActions.addComment({ slug: this.articleSlug, request }),
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
