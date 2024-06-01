import { ErrorMessageComponent } from './../../ui/error-message.component';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import {
  selectError,
  selectIsLoading,
  selectPopularTagsData,
} from './data-access/store/reducers';
import { popularTagsActions } from './data-access/store/actions';
import { AsyncPipe } from '@angular/common';
import { LoadingComponent } from '../../ui/loading.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-popular-tags',
  standalone: true,
  imports: [AsyncPipe, LoadingComponent, ErrorMessageComponent, RouterLink],
  template: `
    @if (data$ | async; as data) { @if (!data.popularTags && data.isLoading) {
    <app-loading />
    } @if (data.error) {
    <app-error-message [message]="data.error" ] />
    } @if (data.popularTags) {
    <div class="sidebar">
      <p>Popular Tags</p>
      <div class="tag-list">
        @for (tag of data.popularTags; track $index) {
        <a [routerLink]="['/tags', tag]" class="tag-default tag-pill">{{
          tag
        }}</a>
        }
      </div>
    </div>
    } }
  `,
})
export class PopularTagsComponent {
  private store: Store = inject(Store);

  data$ = combineLatest({
    popularTags: this.store.select(selectPopularTagsData),
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
  });

  ngOnInit(): void {
    this.store.dispatch(popularTagsActions.getPopularTags());
  }
}
