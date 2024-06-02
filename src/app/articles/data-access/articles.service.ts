import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ArticleResponse } from '../interfaces/article-response';
import { Article } from '../../shared/interfaces/article';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private http: HttpClient = inject(HttpClient);

  getArticle(slug: string): Observable<Article> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}`;
    return this.http
      .get<ArticleResponse>(fullUrl)
      .pipe(map((response) => response.article));
  }
}
