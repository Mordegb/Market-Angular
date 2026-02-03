import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../../../service/produto'; // Ajuste o caminho se necessário
import { ProdutoProps } from '../../../Produto.model'; // Ajuste o caminho se necessário
import { ButtonColor } from '../../../components/button-color/button-color';
import { CarrinhoService } from '../../../service/carrinho/carrinho.service';
import { signal } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ButtonColor],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  produtos: ProdutoProps[] = [];
  isLoading!: boolean;

  constructor(
    private produtoService: Produto,
    private carrinhoService: CarrinhoService
  ) {}

  ngOnInit(): void {
    this.isLoading
    this.carregarDados();
  }

  carregarDados() {
    this.isLoading = true; // Garante que mostre carregando ao iniciar
    this.produtoService.getAll().subscribe({
      next: (dados: any) => {
      
        this.produtos = dados.products; 
        console.log('Produtos carregados:', this.produtos);
        this.isLoading = false; 
      },
      error: (erro) => {
        console.error('Erro:', erro);
        this.isLoading = false; 
      }
    });
  }

  comprar(item: ProdutoProps) {
    console.log('Adicionando ao carrinho:', item);
    this.carrinhoService.adicionarAoCarrinho(item);
  }
}