import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { articleActions } from './data-access/store/actions';
import { combineLatest, filter, map } from 'rxjs';
import {
  selectArticleData,
  selectError,
  selectIsLoading,
} from './data-access/store/reducers';
import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import { selectCurrentUser } from '../../../auth/data-access/store/reducers';
import { ErrorMessageComponent } from '../../../shared/ui/error-message.component';
import { TagListComponent } from '../../../shared/ui/tag-list.component';
import { LoadingComponent } from '../../../shared/ui/loading.component';
import { AddToFavoritesComponent } from '../../../shared/feature/add-to-favorites/add-to-favorites.component';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    TagListComponent,
    ErrorMessageComponent,
    LoadingComponent,
    AddToFavoritesComponent,
    DatePipe,
    NgClass,
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent implements OnInit {
  private store: Store = inject(Store);
  private route: ActivatedRoute = inject(ActivatedRoute);

  slug = this.route.snapshot.paramMap.get('slug') ?? '';

  isAuthor$ = combineLatest({
    article: this.store.select(selectArticleData),
    currentUser: this.store
      .select(selectCurrentUser)
      .pipe(filter((currentUser) => currentUser !== undefined)), //check if currentUser is not undefined
  }).pipe(
    map(({ article, currentUser }) => {
      if (!article || !currentUser) {
        return false;
      }
      return article.author.username === currentUser.username;
    }),
  );

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    article: this.store.select(selectArticleData),
    isAuthor: this.isAuthor$,
  });

  ngOnInit(): void {
    this.store.dispatch(articleActions.getArticle({ slug: this.slug }));
  }

  deleteArticle(): void {
    this.store.dispatch(articleActions.deleteArticle({ slug: this.slug }));
  }
}
