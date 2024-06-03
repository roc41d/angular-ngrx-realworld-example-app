import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Article } from '../../../interfaces/article';
import { ArticleResponse } from '../../../../articles/interfaces/article-response';

@Injectable({
  providedIn: 'root',
})
export class AddToFavoritesService {
  private http: HttpClient = inject(HttpClient);

  getUrl(slug: string): string {
    return `${environment.apiUrl}/articles/${slug}/favorite`;
  }

  addToFavorites(slug: string): Observable<Article> {
    const url = this.getUrl(slug);
    return this.http.post<ArticleResponse>(url, {}).pipe(map(this.getArticle));
  }

  removeFromFavorites(slug: string): Observable<Article> {
    const url = this.getUrl(slug);
    return this.http.delete<ArticleResponse>(url).pipe(map(this.getArticle));
  }

  getArticle(response: ArticleResponse): Article {
    return response.article;
  }
}
