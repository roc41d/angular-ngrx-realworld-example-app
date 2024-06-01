import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PopularTagResponse } from '../interfaces/popular-tag-response';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PopularTagService {

  private http: HttpClient = inject(HttpClient);

  getPopularTags(): Observable<PopularTagResponse> {
    const url = `${environment.apiUrl}/tags`;
    return this.http.get<PopularTagResponse>(url);
  }
}
