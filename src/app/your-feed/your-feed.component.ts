import { Component } from '@angular/core';
import { FeedTogglerComponent } from '../shared/feature/feed-toggler.component';
import { FeedComponent } from '../shared/feature/feed/feed.component';
import { PopularTagsComponent } from '../shared/feature/popular-tags/popular-tags.component';
import { BannerComponent } from '../shared/ui/banner.component';

@Component({
  selector: 'app-your-feed',
  standalone: true,
  imports: [
    BannerComponent,
    FeedComponent,
    PopularTagsComponent,
    FeedTogglerComponent,
  ],
  template: `
    <div class="home-page">
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
export class YourFeedComponent {
  apiUrl = '/articles/feed';
}
