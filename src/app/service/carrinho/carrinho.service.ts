import { Injectable } from '@angular/core';
import { ProdutoProps } from '../../Produto.model'; 

@Injectable({
  providedIn: 'root' 
})
export class CarrinhoService {
  private itens: ProdutoProps[] = [];


  adicionarAoCarrinho(produto: ProdutoProps) {
    this.itens.push(produto);
    console.log('Carrinho atual:', this.itens); 
    alert(`${produto.title} adicionado ao carrinho!`);
  }

  obterItens() {
    return this.itens;
  }
  
  limparCarrinho() {
    this.itens = [];
  }
}