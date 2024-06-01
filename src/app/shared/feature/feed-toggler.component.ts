import { Component, Input, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../auth/data-access/store/reducers';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-feed-toggler',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  template: `
    <div class="feed-toggle">
      <ul class="nav nav-pills outline-active">
        @if (currentUser$ | async) {
        <li class="nav-item">
          <a routerLink="/feed" class="nav-link" routerLinkActive="active"
            >Your feed</a
          >
        </li>
        }
        <li class="nav-item">
          <a
            routerLink="/"
            class="nav-link"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
            queryParamsHandling="merge"
            >Global feed</a
          >
        </li>
        @if (tagName) {
        <li class="nav-item">
          <a
            [routerLink]="['/tags', tagName]"
            class="nav-link"
            routerLinkActive="active"
          >
            <i class="ion-pound"></i>
            {{ tagName }}
          </a>
        </li>
        }
      </ul>
    </div>
  `,
})
export class FeedTogglerComponent {
  @Input() tagName?: string;

  private store: Store = inject(Store);

  currentUser$ = this.store.select(selectCurrentUser);
}
