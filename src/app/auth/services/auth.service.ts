import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environments.baseUrl;
  private user?: User;

  constructor(private HttpClient: HttpClient) { };

  get currentUser(): User | undefined {
    if (!this.user) return undefined;
    return structuredClone(this.user);
  }

  signIn(email: string, password: string): Observable<User> {
    return this.HttpClient.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => {
          this.user = user;
          localStorage.setItem('id', user.id.toString());
        })
      );
  }

  logOut() {
    this.user = undefined;
    localStorage.clear();
  }
}
