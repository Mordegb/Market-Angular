import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrinhoService } from '../../../service/carrinho/carrinho.service';
import { ProdutoProps } from '../../../Produto.model';
import { ButtonColor } from '../../../components/button-color/button-color';

@Component({
  selector: 'app-carrinho',
  imports: [CommonModule, ButtonColor],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.scss',
})
export class Carrinho {
  itensNoCarrinho: ProdutoProps[] = [];
  constructor(private carrinhoService: CarrinhoService) {
    this.calcularTotal() // pra começar assim que o componente abri ja que a logica ta aqui
  }
  
  ValorTotal: number = 0;
  calcularTotal(){
    this.ValorTotal = 0
      for(let i = 0; i < this.itensNoCarrinho.length; i++){
          this.ValorTotal += this.itensNoCarrinho[i].price!;
        }
        this.ValorTotal = Number(this.ValorTotal.toFixed(2));
    }

  ngOnInit() {
    this.itensNoCarrinho = this.carrinhoService.obterItens();
    this.calcularTotal()
  }

  atualizarLista() {
    this.itensNoCarrinho = this.carrinhoService.obterItens();
    this.calcularTotal()
  }

  remover(id: number) {
    this.carrinhoService.removerItem(id);
    this.atualizarLista(); 
    this.calcularTotal()
  }
}
