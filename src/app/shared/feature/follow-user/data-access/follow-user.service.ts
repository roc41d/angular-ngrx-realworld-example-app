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

  private getUrl(username: string): string {
    return `${environment.apiUrl}/profiles/${username}/follow`;
  }

  followUser(username: string): Observable<Profile> {
    const url = this.getUrl(username);
    return this.http.post<ProfileResponse>(url, {}).pipe(map(this.getProfile));
  }

  unfollowUnser(username: string): Observable<Profile> {
    const url = this.getUrl(username);
    return this.http.delete<ProfileResponse>(url).pipe(map(this.getProfile));
  }

  private getProfile(response: ProfileResponse): Profile {
    return response.profile;
  }
}
