import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { FeedResponse } from '../interfaces/feed-response';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private http: HttpClient = inject(HttpClient);

  getFeed(url: string): Observable<FeedResponse> {
    const fullUrl = environment.apiUrl + url;
    return this.http.get<FeedResponse>(fullUrl);
  }
}
