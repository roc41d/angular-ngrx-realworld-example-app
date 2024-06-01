import { Component } from '@angular/core';
import { BannerComponent } from '../shared/ui/banner.component';
import { FeedComponent } from '../shared/feature/feed/feed.component';
import { PopularTagsComponent } from '../shared/feature/popular-tags/popular-tags.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerComponent, FeedComponent, PopularTagsComponent],
  template: `
    <div class="home-page">
      <app-banner />

      <div class="container page">
        <div class="row">
          <div class="col-md-9">
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
}
