import { Component, inject } from '@angular/core';
import { BannerComponent } from '../shared/ui/banner.component';
import { FeedComponent } from '../shared/feature/feed/feed.component';
import { PopularTagsComponent } from '../shared/feature/popular-tags/popular-tags.component';
import { FeedTogglerComponent } from '../shared/feature/feed-toggler.component';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../auth/data-access/store/reducers';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BannerComponent,
    FeedComponent,
    PopularTagsComponent,
    FeedTogglerComponent,
    AsyncPipe,
  ],
  template: `
    <div class="home-page">
      @if (!(currentUser$ | async)) {
      <app-banner />
      }
      <div class="container page">
        <div class="row">
          <div class="col-md-9">
            <app-feed-toggler />
            <app-feed [apiUrl]="apiUrl" />
          </div>

          <div class="col-md-3">
            <app-popular-tags />
          </div>
        </div>
      </div>
    </div>
  `,
})
export class HomeComponent {
  public apiUrl = '/articles';

  private store: Store = inject(Store);

  currentUser$ = this.store.select(selectCurrentUser);
}
