import { Component, Input } from '@angular/core';
import { Comment } from '../../interfaces/comment';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

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
        <span class="date-posted">{{ comment.createdAt | date : '' }}</span>
      </div>
    </div>
  `,
})
export class CommentItemsComponent {
  @Input({ required: true }) comment!: Comment;
}
