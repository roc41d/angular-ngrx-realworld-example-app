import { NgClass } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addToFavoritesActions } from './data-access/store/actions';
import { selectCurrentUser } from '../../../auth/data-access/store/reducers';
import { map, take } from 'rxjs';
import { selectIsSubmitting } from './data-access/store/reducers';

@Component({
  selector: 'app-add-to-favorites',
  standalone: true,
  imports: [NgClass],
  template: `
    <button
      (click)="toggleFavorite()"
      class="btn btn-sm"
      [ngClass]="isFavorited ? 'btn-primary' : 'btn-outline-primary'"
    >
      <i class="ion-heart"></i>
      @if (showLabel) { &nbsp;
      {{ isFavorited ? 'Unfavorite ' : 'Favorite ' }} Article
      <span class="counter">({{ favoritesCount }})</span>
      } @else {
      <span>&nbsp; {{ favoritesCount }}</span>
      }
    </button>
  `,
})
export class AddToFavoritesComponent {
  private store: Store = inject(Store);
  private router: Router = inject(Router);

  @Input() showLabel: boolean = false;
  @Input() isFavorited: boolean = false;
  @Input() favoritesCount: number = 0;
  @Input() articleSlug: string = '';

  currentUser$ = this.store.select(selectCurrentUser);

  toggleFavorite(): void {
    this.currentUser$.pipe(take(1)).subscribe((currentUser) => {
      if (!currentUser) {
        this.router.navigate(['/login']);
      } else {
        this.store.dispatch(
          addToFavoritesActions.addToFavorites({
            isFavorited: this.isFavorited,
            slug: this.articleSlug,
          }),
        );

        if (this.isFavorited) {
          this.favoritesCount = this.favoritesCount - 1;
        } else {
          this.favoritesCount = this.favoritesCount + 1;
        }

        this.isFavorited = !this.isFavorited;
      }
    });
  }
}
