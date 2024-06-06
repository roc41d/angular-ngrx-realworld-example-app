import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CommentsResponse } from '../interfaces/comments-respoonse';
import { Comment } from '../interfaces/comment';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private http: HttpClient = inject(HttpClient);
  private url = `${environment.apiUrl}/articles`;

  getComments(slug: string): Observable<Comment[]> {
    const fullUrl = `${this.url}/${slug}/comments`;
    return this.http
      .get<CommentsResponse>(fullUrl)
      .pipe(map((response) => response.comments));
  }
}
