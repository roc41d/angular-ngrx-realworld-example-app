import { Component } from '@angular/core';

@Component({
  selector: 'app-popular-tags',
  standalone: true,
  imports: [],
  template: `
    <div class="sidebar">
      <p>Popular Tags</p>
      <div class="tag-list">
        @for (tag of tags; track $index) {
        <a href="" class="tag-pill tag-default">{{ tag }}</a>
        }
      </div>
    </div>
  `,
})
export class PopularTagsComponent {
  tags: string[] = [
    'programming',
    'javascript',
    'emberjs',
    'angularjs',
    'react',
    'mean',
  ];
}
