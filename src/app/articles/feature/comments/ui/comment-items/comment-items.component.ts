import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comment } from '../../interfaces/comment';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CurrentUser } from '../../../../../shared/interfaces/current-user';

@Component({
  selector: 'app-comment-items',
  standalone: true,
  imports: [RouterLink, DatePipe],
  template: `
    <div class="card">
      <div class="card-block">
        <p class="card-text">
          {{ comment.body }}
        </p>
      </div>
      <div class="card-footer">
        <a
          [routerLink]="['/profiles', comment.author.username]"
          class="comment-author"
        >
          <img [src]="comment.author.image" class="comment-author-img" />
        </a>
        &nbsp;
        <a
          [routerLink]="['/profiles', comment.author.username]"
          class="comment-author"
          >{{ comment.author.username }}</a
        >
        <span class="date-posted">{{
          comment.createdAt | date : 'MMMM d, y'
        }}</span>
        @if (currentUser && currentUser.username === comment.author.username) {
          <span class="mod-options" (click)="deleteComment.emit(comment.id)"><i class="ion-trash-a"></i></span>
        }
      </div>
    </div>
  `,
})
export class CommentItemsComponent {
  @Input({ required: true }) comment!: Comment;
  @Input({ required: true }) currentUser!: CurrentUser;

  @Output() deleteComment = new EventEmitter<number>();
}
