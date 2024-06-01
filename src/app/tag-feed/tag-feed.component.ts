import { Component, OnInit, inject } from '@angular/core';
import { FeedComponent } from '../shared/feature/feed/feed.component';
import { FeedTogglerComponent } from '../shared/feature/feed-toggler.component';
import { PopularTagsComponent } from '../shared/feature/popular-tags/popular-tags.component';
import { BannerComponent } from '../shared/ui/banner.component';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-tag-feed',
  standalone: true,
  imports: [
    BannerComponent,
    FeedComponent,
    PopularTagsComponent,
    FeedTogglerComponent,
  ],
  template: `
    <div class="tag-feed">
      <div class="container page">
        <div class="row">
          <div class="col-md-9">
            <app-feed-toggler [tagName]="tagName" />
            <app-feed [apiUrl]="apiUrl" />
          </div>

          <div class="col-md-3">
            <app-popular-tags />
          </div>
        </div>
      </div>
    </div>
  `
})
export class TagFeedComponent implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);

  apiUrl: string = ''
  tagName: string = ''

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.tagName = params['slug']
      this.apiUrl = `/articles?tag=${this.tagName}`
    })
  }
}
