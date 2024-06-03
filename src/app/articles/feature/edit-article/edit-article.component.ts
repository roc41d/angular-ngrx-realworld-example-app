import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { editArticleActions } from './data-access/store/actions';
import { ArticleRequest } from '../../interfaces/article-request';
import { ArticleFormData } from '../../interfaces/article-form-data';
import { Observable, combineLatest, filter, map } from 'rxjs';
import {
  selectArticle,
  selectIsLoading,
  selectIsSubmitting,
  selectValidationErrors,
} from './data-access/store/reducers';
import { Article } from '../../../shared/interfaces/article';
import { LoadingComponent } from '../../../shared/ui/loading.component';
import { AsyncPipe } from '@angular/common';
import { ArticleFormComponent } from '../../ui/article-form/article-form.component';

@Component({
  selector: 'app-edit-article',
  standalone: true,
  imports: [AsyncPipe, LoadingComponent, ArticleFormComponent],
  templateUrl: './edit-article.component.html',
  styleUrl: './edit-article.component.scss',
})
export class EditArticleComponent implements OnInit {
  private store: Store = inject(Store);
  private route: ActivatedRoute = inject(ActivatedRoute);

  private slug = this.route.snapshot.paramMap.get('slug') ?? '';

  initialValues$: Observable<ArticleFormData> = this.store.pipe(
    select(selectArticle),
    filter((article): article is Article => article !== null),
    map((article: Article) => {
      return {
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tagList,
      };
    }),
  );

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
    isLoading: this.store.select(selectIsLoading),
    initialValues: this.initialValues$,
  });

  ngOnInit(): void {
    this.store.dispatch(editArticleActions.getArticle({ slug: this.slug }));
  }

  onSubmit(articleFormData: ArticleFormData): void {
    const request: ArticleRequest = {
      article: articleFormData,
    };
    this.store.dispatch(
      editArticleActions.updateArticle({ request, slug: this.slug }),
    );
  }
}
