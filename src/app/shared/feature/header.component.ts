import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../auth/data-access/store/reducers';
import { AsyncPipe } from '@angular/common';
import { authActions } from '../../auth/data-access/store/actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  template: `
    <nav class="navbar navbar-light">
      <div class="container">
        <a class="navbar-brand" routerLink="/">conduit</a>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <a class="nav-link active" routerLink="/">Home</a>
          </li>
          @if (currentUser$ | async; as currentUser) {
          <li class="nav-item">
            <a class="nav-link" routerLink="/articles/new">
              <i class="ion-compose"></i>&nbsp;New Article
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/settings">
              <i class="ion-gear-a"></i>&nbsp;Settings
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              [routerLink]="['/profiles', currentUser.username]"
            >
              <img class="user-pic" [src]="currentUser.image" />
              &nbsp; {{ currentUser.username }}
            </a>
          </li>
          <li class="nav-item sign-out" (click)="logout()">
            <a class="nav-link"> Sign Out </a>
          </li>
          } @else {
          <li class="nav-item">
            <a class="nav-link" routerLink="/login">Sign in</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/register">Sign up</a>
          </li>
          }
        </ul>
      </div>
    </nav>
  `,
  styles: [
    `
      .sign-out {
        cursor: pointer;
      }
    `,
  ]
})
export class HeaderComponent {
  private store = inject(Store);

  currentUser$ = this.store.select(selectCurrentUser);

  logout(): void {
    this.store.dispatch(authActions.logout());
  }
}
