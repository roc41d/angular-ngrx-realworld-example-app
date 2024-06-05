import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ArticleResponse } from '../interfaces/article-response';
import { Article } from '../../shared/interfaces/article';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ArticleRequest } from '../interfaces/article-request';
import { CommentsResponse } from '../feature/comments/interfaces/comments-respoonse';
import { Comment } from '../feature/comments/interfaces/comment';

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

  deleteArticle(slug: string): Observable<{}> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}`;
    return this.http.delete(fullUrl);
  }

  createArticle(articleRequest: ArticleRequest): Observable<Article> {
    const fullUrl = `${environment.apiUrl}/articles`;
    return this.http
      .post<ArticleResponse>(fullUrl, articleRequest)
      .pipe(map((response) => response.article));
  }

  editArticle(
    slug: string,
    articleRequest: ArticleRequest,
  ): Observable<Article> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}`;
    return this.http
      .put<ArticleResponse>(fullUrl, articleRequest)
      .pipe(map((response) => response.article));
  }

  getComments(slug: string): Observable<Comment[]> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}/comments`;
    return this.http
      .get<CommentsResponse>(fullUrl)
      .pipe(map((response) => response.comments));
  }
}
