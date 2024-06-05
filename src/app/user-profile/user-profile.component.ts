import { Component, OnInit, inject } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  Params,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { Store, select } from '@ngrx/store';
import { userProfileActions } from './data-access/store/actions';
import { combineLatest, filter, map } from 'rxjs';
import {
  selectIsLoading,
  selectError,
  selectUserProfileData,
} from './data-access/store/reducers';
import { selectCurrentUser } from '../auth/data-access/store/reducers';
import { Profile } from '../shared/interfaces/profile';
import { CurrentUser } from '../shared/interfaces/current-user';
import { AsyncPipe } from '@angular/common';
import { FeedComponent } from '../shared/feature/feed/feed.component';
import { FollowUserComponent } from '../shared/feature/follow-user/follow-user.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    RouterLinkActive,
    FeedComponent,
    FollowUserComponent,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  private store: Store = inject(Store);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);

  private username: string = '';
  isCurrentUserProfile$ = combineLatest({
    currentUser: this.store.pipe(
      select(selectCurrentUser),
      filter(
        (currentUser): currentUser is CurrentUser => currentUser !== undefined,
      ),
    ),
    userProfile: this.store.pipe(
      select(selectUserProfileData),
      filter((userProfile): userProfile is Profile => Boolean(userProfile)),
    ),
  }).pipe(
    map(({ currentUser, userProfile }) => {
      if (!currentUser || !userProfile) {
        return false;
      }
      return currentUser.username === userProfile.username;
    }),
  );

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    userProfile: this.store.select(selectUserProfileData),
    isCurrentUserProfile: this.isCurrentUserProfile$,
  });

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.username = params['username'];
      this.store.dispatch(
        userProfileActions.getUserProfile({ username: this.username }),
      );
    });
  }

  getApiUrl(): string {
    const isFavorites = this.router.url.includes('favorites');
    return isFavorites
      ? `/articles?favorited=${this.username}`
      : `/articles?author=${this.username}`;
  }
}
