import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ProdutoProps } from '../../Produto.model';

export interface APIResponse {
  products: ProdutoProps[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductAndStock {
  productId: number; //vai permitir mudar um stock pelo id do produto
  stock: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private apiUrl = 'https://dummyjson.com/products';
  private http = inject(HttpClient);
  private listaProdutos: ProdutoProps[] = [];
  private stockValues = signal<ProductAndStock[]>([]);

  setInitialValues() {
    //aq os valores dos produtos ficam nun arrya dos  valores, furutamente a exibição da quantidade de produtos sera feita aq
    this.stockValues.set(
      this.listaProdutos.map((u) => ({
        productId: u.id!,
        stock: u.stock!,
      })),
    );
  }

  inicializateStock(id: number, stock: number) {
    // mais pra single page em caso de não carregar o array na home
    this.stockValues.update((atual) => {
      const existe = atual.some((item) => item.productId === id);
      if (existe) {
        return atual; // não muda nada se ja renderizou
      }
      return [...atual, { productId: id, stock }];
    });
  }

  getOriginalStock(id: number): number {
    return this.listaProdutos.find((produto) => produto.id === id)?.stock ?? 0;
  }

  getStock(id: number): number {
    const produto = this.stockValues().find((product) => product.productId === id);
    return produto?.stock ?? 0;
  }

  uptadeStock(id: number, newValue: number) {
    this.stockValues.update((atual) => {
      const existe = atual.some((item) => item.productId === id);
      if (existe) {
        return atual.map((item) => (item.productId === id ? { ...item, stock: newValue } : item));
      }
      //se o produto não tiver sido adicionado inicialmente  pelo getall adiciona
      return [...atual, { productId: id, stock: newValue }];
    });
  }

  getSingle(id: number): Observable<ProdutoProps> {
    return this.http.get<ProdutoProps>(`${this.apiUrl}/${id}`).pipe(
      tap((produto) => {
        this.inicializateStock(produto.id!, produto.stock!); //no sobresvreve com as informações da api acabando com o bug
      }),
    );
  }

  getAll(): Observable<APIResponse> {
    if (this.listaProdutos.length > 0) {
      return of({ products: this.listaProdutos } as any);
    }

    return this.http.get<APIResponse>(this.apiUrl).pipe(
      tap((dados) => {
        this.listaProdutos = dados.products;
        this.setInitialValues();
      }),
    );
  }
}
