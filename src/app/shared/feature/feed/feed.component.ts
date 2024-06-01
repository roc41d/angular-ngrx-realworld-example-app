import { Component, Input, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { feedActions } from './data-acess/store/actions';
import { combineLatest } from 'rxjs';
import {
  selectError,
  selectFeedData,
  selectIsLoading,
} from './data-acess/store/reducers';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ErrorMessageComponent } from '../../ui/error-message.component';
import { LoadingComponent } from '../../ui/loading.component';
import { TagListComponent } from '../../ui/tag-list.component';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    LoadingComponent,
    ErrorMessageComponent,
    TagListComponent,
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
})
export class FeedComponent implements OnInit {
  @Input({ required: true }) apiUrl: string = '';

  private store: Store = inject(Store);

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    feed: this.store.select(selectFeedData),
  });

  ngOnInit(): void {
    this.store.dispatch(feedActions.getFeed({ url: this.apiUrl }));
  }
}
