import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Profile } from '../../../interfaces/profile';
import { ProfileResponse } from '../../../interfaces/profile-response';

@Injectable({
  providedIn: 'root',
})
export class FollowUserService {
  private http: HttpClient = inject(HttpClient);

  getUrl(userName: string): string {
    return `${environment.apiUrl}/profiles/${userName}/follow`;
  }

  followUser(slug: string): Observable<Profile> {
    const url = this.getUrl(slug);
    return this.http.post<ProfileResponse>(url, {}).pipe(map(this.getProfile));
  }

  unfollowUnser(slug: string): Observable<Profile> {
    const url = this.getUrl(slug);
    return this.http.delete<ProfileResponse>(url).pipe(map(this.getProfile));
  }

  getProfile(response: ProfileResponse): Profile {
    return response.profile;
  }
}
