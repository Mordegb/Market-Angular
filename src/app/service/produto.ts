import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProdutoProps } from '../Produto.model';

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

  getAll(): Observable<ProdutoProps> {
    if (this.listaProdutos.length > 0) {
      return of({ products: this.listaProdutos });
    }

    return this.http
      .get<ProdutoProps>(this.apiUrl)
      .pipe(tap((dados) => (this.listaProdutos = dados.products)));
  }
}
