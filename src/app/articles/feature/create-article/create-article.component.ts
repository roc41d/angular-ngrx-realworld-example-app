import { Component, inject } from '@angular/core';
import { ArticleFormComponent } from '../../ui/article-form/article-form.component';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import {
  selectIsSubmitting,
  selectValidationErrors,
} from './data-access/store/reducers';
import { createArticleActions } from './data-access/store/actions';
import { ArticleRequest } from '../../interfaces/article-request';
import { ArticleFormData } from '../../interfaces/article-form-data';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-create-article',
  standalone: true,
  imports: [ArticleFormComponent, AsyncPipe],
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.scss',
})
export class CreateArticleComponent {
  private store: Store = inject(Store);

  initialValues: ArticleFormData = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  });

  onSubmit(articleFormData: ArticleFormData): void {
    const request: ArticleRequest = {
      article: articleFormData,
    };
    this.store.dispatch(createArticleActions.createArticle({ request }));
  }
}
