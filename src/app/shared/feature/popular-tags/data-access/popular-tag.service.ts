import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PopularTagResponse } from '../interfaces/popular-tag-response';
import { environment } from '../../../../../environments/environment';
import { PopularTagType } from '../../../interfaces/popular-tag.type';

@Injectable({
  providedIn: 'root',
})
export class PopularTagService {
  private http: HttpClient = inject(HttpClient);

  getPopularTags(): Observable<PopularTagType[]> {
    const url = `${environment.apiUrl}/tags`;
    return this.http
      .get<PopularTagResponse>(url)
      .pipe(map((resp) => resp.tags));
  }
}
