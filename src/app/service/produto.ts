import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProdutoProps } from '../Produto.model'; 

@Injectable({
  providedIn: 'root',
})
export class Produto {
  private apiUrl ='https://dummyjson.com/products'
  private http = inject(HttpClient)

  getSingle(id:number): Observable<ProdutoProps>{
    return this.http.get<ProdutoProps>(`${this.apiUrl}/${id}`)
  }

  getAll():Observable<ProdutoProps[]>{
    return this.http.get<ProdutoProps[]>(this.apiUrl)
  }

 

  }


