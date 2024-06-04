import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Article } from '../../../../../shared/interfaces/article';
import { RouterLink } from '@angular/router';
import { AddToFavoritesComponent } from '../../../../../shared/feature/add-to-favorites/add-to-favorites.component';
import { FollowUserComponent } from '../../../../../shared/feature/follow-user/follow-user.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-author-banner',
  standalone: true,
  imports: [RouterLink, AddToFavoritesComponent, FollowUserComponent, DatePipe],
  template: `
    <div class="article-meta">
      <a [routerLink]="['/profiles', article.author.username]"
        ><img [src]="article.author.image"
      /></a>
      <div class="info">
        <a [routerLink]="['/profiles', article.author.username]" class="author">
          {{ article.author.username }}
        </a>
        <span class="date">{{ article.createdAt | date : 'MMMM d, y' }}</span>
      </div>

      @if (isAuthor) {
      <a
        [routerLink]="['/articles', article.slug, 'edit']"
        class="btn btn-sm btn-outline-secondary"
      >
        <i class="ion-edit"></i> Edit Article
      </a>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-outline-danger"
        (click)="deleteArticle.emit(article.slug)"
      >
        <i class="ion-trash-a"></i> Delete Article
      </button>
      } @else {
      <app-follow-user
        [username]="article.author.username"
        [isFollowing]="article.author.following"
      />
      &nbsp;&nbsp;
      <app-add-to-favorites
        [isFavorited]="article.favorited"
        [articleSlug]="article.slug"
        [favoritesCount]="article.favoritesCount"
        [showLabel]="true"
      />
      }
    </div>
  `,
})
export class AuthorBannerComponent {
  @Input({ required: true }) article!: Article;
  @Input({ required: true }) isAuthor: boolean = false;

  @Output() deleteArticle = new EventEmitter<string>();
}
