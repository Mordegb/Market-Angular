import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap , map} from 'rxjs/operators';

export interface userProps{
  id?:number;
  username:string
  email?:string;
  password:string
}

interface DummyResponse { // O que a API retorna
  users: userProps[];
  total: number;
}

@Injectable({
  providedIn: 'root',
})

export class UserService {
  private ListaUsuarios:userProps[] = []
  private http = inject(HttpClient)
  private apiUrl = 'https://dummyjson.com/users'

  getAll(): Observable<userProps[]> {
  if (this.ListaUsuarios.length > 0) {
    return of(this.ListaUsuarios);
  }

  return this.http.get<DummyResponse>(this.apiUrl).pipe(
    map(res => res.users), 
    tap(dados => this.ListaUsuarios = dados)
  );
}
}
