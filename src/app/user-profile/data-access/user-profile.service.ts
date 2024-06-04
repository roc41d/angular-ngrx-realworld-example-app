import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ProfileResponse } from '../../shared/interfaces/profile-response';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Profile } from '../../shared/interfaces/profile';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private http: HttpClient = inject(HttpClient);

  getUserProfile(username: string): Observable<Profile> {
    const url = `${environment.apiUrl}/profiles/${username}`;
    return this.http
      .get<ProfileResponse>(url)
      .pipe(map((response) => response.profile));
  }
}
