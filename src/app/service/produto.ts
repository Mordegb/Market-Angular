import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ProdutoProps } from '../Produto.model';

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

  private listaProdutos: ProdutoProps[] = [];

  getSingle(id: number): Observable<ProdutoProps> {
    return this.http.get<ProdutoProps>(`${this.apiUrl}/${id}`);
  }

  getAll(): Observable<APIResponse> {
    if (this.listaProdutos.length > 0) {
      return of({ products: this.listaProdutos } as any);
    }

    return this.http.get<APIResponse>(this.apiUrl).pipe(
      tap((dados) => {
        this.listaProdutos = dados.products;
      })
    );
  }
}