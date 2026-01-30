import { Injectable } from '@angular/core';
import { ProdutoProps } from '../../Produto.model';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  private itens: ProdutoProps[] = [];

  adicionarAoCarrinho(produto: ProdutoProps) {
    this.itens.push(produto);
    console.log('Carrinho atual:', this.itens);
    alert(`produto adicionado ao carrinho!`);
  }

  obterItens() {
    return this.itens;
  }

  limparCarrinho() {
    this.itens = [];
  }

  removerItem(id: number) {
    this.itens = this.itens.filter((item) => item.id !== id);
    console.log('Item removido. Carrinho atual:', this.itens);
  }
}
