import { AsyncPipe } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { CommentItemsComponent } from '../../ui/comment-items/comment-items.component';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { commentActions } from './data-access/store/actions';
import {
  selectCommentData,
  selectError,
  selectIsLoading,
} from './data-access/store/reducers';
import { LoadingComponent } from '../../../../../shared/ui/loading.component';
import { AddCommentComponent } from '../add-comment/add-comment.component';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [
    AsyncPipe,
    CommentItemsComponent,
    LoadingComponent,
    AddCommentComponent,
  ],
  template: `
    @if (data$ | async; as data) {
    <div class="row">
      <div class="col-xs-12 col-md-8 offset-md-2">
        <app-add-comment [articleSlug]="articleSlug" />
        @if(data.isLoading) {
        <app-loading />
        } @for (comment of data.comments; track $index) {
        <app-comment-items [comment]="comment" />
        }
      </div>
    </div>
    }
  `,
})
export class CommentListComponent {
  @Input({ required: true }) articleSlug: string = '';

  private store: Store = inject(Store);

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    comments: this.store.select(selectCommentData),
  });

  ngOnInit(): void {
    this.store.dispatch(commentActions.getComments({ slug: this.articleSlug }));
  }
}
