import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tag-list',
  template: `
    <ul class="tag-list">
      @for (tag of tags; track $index) {
      <li class="tag-default tag-pill tag-outline">
        {{ tag }}
      </li>
      }
    </ul>
  `,
  standalone: true,
})
export class TagListComponent {
  @Input() tags: string[] = [];
}
