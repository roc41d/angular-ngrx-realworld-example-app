import { Component, Input, inject } from '@angular/core';
import { FollowUserService } from './data-access/follow-user.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-follow-user',
  standalone: true,
  imports: [NgClass],
  template: `
    <button
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
export class FollowUserComponent {
  @Input({ required: true }) isFollowing: boolean = false;
  @Input({ required: true }) username: string = '';

  toggleFollowUser(): void {
    const username = encodeURIComponent(this.username);
  }
}
