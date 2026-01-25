import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../../service/produto';
import { ProdutoProps } from '../../Produto.model';
import { ButtonColor } from '../button-color/button-color';
import { CarrinhoService } from '../../service/carrinho/carrinho.service'; 
@Component({
  selector: 'app-product-block',
  standalone: true,
  imports: [CommonModule, ButtonColor],
  templateUrl: './product-block.html',
  styleUrl: './product-block.scss',
})
export class ProductBlock implements OnInit {
  produtos: ProdutoProps[] = [];

  constructor(
    private produtoService: Produto,     
    private carrinhoService: CarrinhoService 
  ) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados() {
    this.produtoService.getAll().subscribe({
      next: (dados: any) => {
        this.produtos = dados.products; 
        console.log('Produtos carregados:', this.produtos);
      },
      error: (erro) => console.error('Erro:', erro)
    });
  }

  comprar(item: ProdutoProps) {
    console.log('Adicionando ao carrinho:', item);
    this.carrinhoService.adicionarAoCarrinho(item);
  }
}