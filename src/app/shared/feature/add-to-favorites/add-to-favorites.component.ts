import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add-to-favorites',
  standalone: true,
  imports: [NgClass],
  template: `
    <button
      class="btn btn-sm"
      [ngClass]="isFavorited ? 'btn-primary' : 'btn-outline-primary'"
    >
      <i class="ion-heart"></i>
      @if (showLabel) { &nbsp;
      {{ isFavorited ? 'Unfavorite Post' : 'Favorite Post' }}
      <span class="counter">({{ favoritesCount }})</span>
      } @else {
      <span>&nbsp; {{ favoritesCount }}</span>
      }
    </button>
  `,
})
export class AddToFavoritesComponent {
  @Input() showLabel: boolean = false;
  @Input() isFavorited: boolean = false;
  @Input() favoritesCount: number = 0;
  @Input() articleSlug: string = '';
}
