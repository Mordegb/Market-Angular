import { inject, Injectable, signal } from '@angular/core';
import { ProdutoProps } from '../../Produto.model';
import { HttpClient } from '@angular/common/http';
import { catchError, of, tap } from 'rxjs';

export interface ItemCarrinho {
  produto: ProdutoProps;
  quantity: number;
}

export interface prodctInCart {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
  thumbnail: string;
}

export interface cartAPI {
  id: number;
  product: prodctInCart[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface priceValues {
  totalPrice: number;
  descauntedValue: number;
  priceDiference: number;
}

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  private http = inject(HttpClient);
  private apiUrl = 'https://dummyjson.com/carts';
  private listaItens: ItemCarrinho[] = [];
  ApiState = signal<cartAPI | null>(null);
  isLoading = signal<boolean>(false);
  calculedValue = signal<boolean>(false);

  getItens(): ItemCarrinho[] {
    return this.listaItens;
  }

  addToCart(produto: ProdutoProps): void {
    if (!produto.id) {
      return;
    }

    const itemExistente = this.listaItens.find((u) => u.produto.id === produto.id);
    if (itemExistente) {
      itemExistente.quantity += 1;
    } else {
      this.listaItens.push({ produto, quantity: 1 });
    }

    this.syncAPI();
  }

  removeFromCart(id: number) {
    this.listaItens = this.listaItens.filter((item) => item.produto.id !== id);
    this.syncAPI();
  }

  updateQuantity(id: number, novaQuantidade: number) {
    if (novaQuantidade <= 0) {
      this.removeFromCart(id);
      return;
    }
    const item = this.listaItens.find((item) => item.produto.id === id);
    if (item) {
      item.quantity = novaQuantidade;
      this.syncAPI();
    }
  }

  totalValue(): priceValues {
    //botar pra receber direto da api ao inves de receber no ts
    //botar pra receber o valor com desconto
    var total: number = this.listaItens.reduce(
      (soma, item) => soma + (item.produto.price ?? 0) * item.quantity,
      0,
    );
    total = Number(total.toFixed(2)); //preço total de todos os produtos
    const cart = this.ApiState();
    const finalValue = this.calculedValue() && cart ? cart.discountedTotal : total;
    const valueDiference = Number(total - finalValue);
    return {
      totalPrice: total,
      descauntedValue: finalValue,
      priceDiference: valueDiference,
    };
  }

  clearCart() {
    this.listaItens = [];
    this.ApiState.set(null);
  }

  private syncAPI() {
    if (this.listaItens.length === 0) {
      this.ApiState.set(null);
      return;
    }
    (this, this.calculedValue.set(false));
    this.isLoading.set(true);

    const products = this.listaItens.map((item) => ({
      id: item.produto.id ?? 0,
      quantity: item.quantity,
    }));

    this.http
      .post<cartAPI>(`${this.apiUrl}/add`, {
        userId: 1,
        products,
      })
      .pipe(
        tap((cart) => {
          this.ApiState.set(cart);
          this.calculedValue.set(true);
          this.isLoading.set(false);
        }),
        catchError((erro) => {
          console.error('Erro ao calcular o carrinho na dummyjson:', erro);
          this.isLoading.set(false);
          return of(null);
        }),
      )
      .subscribe();
  }
}

//#metodo original
// private itens: ProdutoProps[] = [];
// adicionarAoCarrinho(produto: ProdutoProps) {
//   this.itens.push(produto);
//   console.log('Carrinho atual:', this.itens);
// }
// obterItens() {
//   return this.itens;
// }
// limparCarrinho() {
//   this.itens = [];
// }
// removerItem(id: number) {
//   this.itens = this.itens.filter((item) => item.id !== id);
//   console.log('Item removido. Carrinho atual:', this.itens);
// }
