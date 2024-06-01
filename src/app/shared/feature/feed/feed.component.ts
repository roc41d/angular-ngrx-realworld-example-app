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
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { ErrorMessageComponent } from '../../ui/error-message.component';
import { LoadingComponent } from '../../ui/loading.component';
import { TagListComponent } from '../../ui/tag-list.component';
import { PaginationComponent } from '../pagination.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    LoadingComponent,
    ErrorMessageComponent,
    TagListComponent,
    PaginationComponent,
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
})
export class FeedComponent implements OnInit {
  @Input({ required: true }) apiUrl: string = '';

  private store: Store = inject(Store);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    feed: this.store.select(selectFeedData),
  });

  limit: number = environment.limit;
  baseUrl: string = this.router.url.split('?')[0];
  currentPage: number = 0

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.currentPage = Number(params['page'] || '1')
      this.fetchFeed()
    })
  }

  fetchFeed() {
    this.store.dispatch(feedActions.getFeed({ url: this.apiUrl }));
  }
}
