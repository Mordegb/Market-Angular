import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrinhoService } from '../../../service/carrinho/carrinho.service';
import { ProdutoProps } from '../../../Produto.model';

@Component({
  selector: 'app-carrinho',
  imports: [CommonModule],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.scss',
})
export class Carrinho {
  itensNoCarrinho: ProdutoProps[] = [];
  constructor(private carrinhoService: CarrinhoService) {}

  ngOnInit() {
    this.itensNoCarrinho = this.carrinhoService.obterItens();
  }

  atualizarLista() {
    this.itensNoCarrinho = this.carrinhoService.obterItens();
  }

  remover(id: number) {
    this.carrinhoService.removerItem(id); // Remove no Service
    this.atualizarLista(); // Atualiza o que aparece na tela
  }
}
