import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ProdutoProps } from '../Produto.model';

// Criamos um "envelope" para tipar a resposta correta da API
export interface APIResponse {
  products: ProdutoProps[];
  total: number;
  skip: number;
  limit: number;
}

@Injectable({
  providedIn: 'root',
})
export class Produto {
  private apiUrl = 'https://dummyjson.com/products';
  private http = inject(HttpClient);

  // Cache para guardar os produtos na memória
  private listaProdutos: ProdutoProps[] = [];

  getSingle(id: number): Observable<ProdutoProps> {
    return this.http.get<ProdutoProps>(`${this.apiUrl}/${id}`);
  }

  // Agora retorna o envelope APIResponse
  getAll(): Observable<APIResponse> {
    if (this.listaProdutos.length > 0) {
      return of({ products: this.listaProdutos } as any);
    }

    return this.http.get<APIResponse>(this.apiUrl).pipe(
      tap((dados) => {
        // Salvamos apenas a lista de produtos no nosso cache
        this.listaProdutos = dados.products;
      })
    );
  }
}