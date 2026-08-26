import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

export interface authUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  images: string;
}

export interface ApiResponse extends authUser {
  accessToken: string;
  refreshToken: string;
}

interface FilterUsersResponse {
  //pra resolver o problema do login do dummy que funciona com username e não email
  users: { username: string; email: string }[];
  total: number;
}

const TOKEN_KEY = 'accessToken'; //chaves no localStorage , como se fosse o banco de dados(não é isso)
const USER_KEY = 'userDates';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private plataformID = inject(PLATFORM_ID);
  private apiUrl = 'https://dummyjson.com';

  private tokenSig = signal<string | null>(this.getToken()); //quando o access token
  private userSig = signal<authUser | null>(this.getUser()); // guard ao usuario logado

  readonly token = this.tokenSig.asReadonly();
  readonly user = this.userSig.asReadonly();
  readonly isAuthenticated = computed(() => !!this.tokenSig()); //pra saber se ta autenticaado

  private setSession(token: string, user: authUser) {
    this.tokenSig.set(token);
    this.userSig.set(user);
    if (isPlatformBrowser(this.plataformID)) {
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  }


  private getToken(): string | null {
    if (!isPlatformBrowser(this.plataformID)) return null;
    return localStorage.getItem(TOKEN_KEY);
  }

  private getUser(): authUser | null {
    if (!isPlatformBrowser(this.plataformID)) return null;
    const key = localStorage.getItem(USER_KEY);
    return key ? JSON.parse(key) : null; //tranforma pra json
  }

  login(email: string, password: string): Observable<authUser> {
    return this.http
      .get<FilterUsersResponse>(`${this.apiUrl}/users/filter`, {
        //faz o filter pro sistema de pegar o username partindo do email
        params: { key: 'email', value: email },
      })
      .pipe(
        switchMap((res) => {
          const found = res.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
          if (!found) {
            return throwError(() => ({ code: 'USER_NOT_FOUND' }));
          }
          return this.http.post<ApiResponse>(`${this.apiUrl}/auth/login`, {
            username: found.username,
            password: password,
            expiresInMins: 10,
          });
        }),
        map((res) => {
          const { accessToken, refreshToken, ...user } = res;
          this.setSession(accessToken, user);
          return user;
        }),
        catchError((err) => {
          if (err?.code === 'USER_NOT_FOUND') {
            return throwError(() => ({ code: 'USER_NOT_FOUND' }));
          }
          return throwError(() => ({ code: 'INVALID_PASSWORD' }));
        }),
      );
  }

  logout(): void {
    this.tokenSig.set(null);
    this.userSig.set(null);
    if (isPlatformBrowser(this.plataformID)) {
      localStorage.clear()
    }
  }
}
