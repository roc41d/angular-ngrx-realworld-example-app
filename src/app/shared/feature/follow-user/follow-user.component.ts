import { Component, Input, OnDestroy, inject } from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';
import { ActionsSubject, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { selectCurrentUser } from '../../../auth/data-access/store/reducers';
import { followUserActions } from './data-access/store/actions';
import { Subject, filter, takeUntil } from 'rxjs';
import { selectIsSubmitting } from './data-access/store/reducers';

@Component({
  selector: 'app-follow-user',
  standalone: true,
  imports: [NgClass, AsyncPipe],
  template: `
    <button
    [disabled]="isSubmitting$ | async"
      (click)="toggleFollowUser()"
      class="btn btn-sm"
      [ngClass]="isFollowing ? 'btn-secondary' : 'btn-outline-secondary'"
    >
      <i class="ion-plus-round"></i>
      &nbsp; {{ isFollowing ? 'Unfollow' : 'Follow' }}
      {{ username }}
    </button>
  `,
})
export class FollowUserComponent implements OnDestroy {
  private store: Store = inject(Store);
  private router: Router = inject(Router);
  private actionsSubj: ActionsSubject = inject(ActionsSubject);

  @Input({ required: true }) isFollowing: boolean = false;
  @Input({ required: true }) username: string = '';
  private destroy$ = new Subject<void>();

  currentUser$ = this.store.select(selectCurrentUser);
  isSubmitting$ = this.store.select(selectIsSubmitting);

  constructor() {
    this.actionsSubj.pipe(
      filter(
        (action) => action.type === followUserActions.followUserSuccess.type,
      ),
      takeUntil(this.destroy$),
    ).subscribe(() => {
      this.isFollowing = !this.isFollowing;
    });
  }

  toggleFollowUser(): void {
    const username = encodeURIComponent(this.username);
    this.currentUser$.subscribe((currentUser) => {
      if (!currentUser) {
        this.router.navigate(['/login']);
      } else {
        this.store.dispatch(
          followUserActions.followUser({
            isFollowing: this.isFollowing,
            username,
          }),
        );
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    console.log('folow/unfollow destroy');
    
  }
}

