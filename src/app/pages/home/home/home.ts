import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../../../service/produto'; // Ajuste o caminho se necessário
import { ProdutoProps } from '../../../Produto.model'; // Ajuste o caminho se necessário
import { ButtonColor } from '../../../components/button-color/button-color';
import { CarrinhoService } from '../../../service/carrinho/carrinho.service';
import { signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ButtonColor],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  produtos = signal<ProdutoProps[]>([])
  isLoading = signal<boolean>(true)

  constructor(
    private produtoService: Produto,
    private carrinhoService: CarrinhoService
  ) {}

  toast = inject(ToastrService)

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados() {
    this.isLoading.set(true) // é pra mostrar que ta carregando
    this.produtoService.getAll().subscribe({
      next: (dados: any) => {
        this.produtos.set(dados.products)
        // console.log('Produtos carregados:', this.produtos());
        this.isLoading.set(false) // muda para false com o .set, por causa do signal
      },
      error: (erro) => {
        // console.error('Erro:', erro);
        this.isLoading.set(false)
      }
    });
  }

  comprar(item: ProdutoProps) {
    this.carrinhoService.adicionarAoCarrinho(item);
    this.toast.success('Adiocionado ao carrinho','',{
      timeOut:3500,
      progressBar:true,
      positionClass: 'toast-bottom-right'

    })
  }
}