import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../../../service/produto/produto.service';
import { ProdutoProps } from '../../../Produto.model';
import { ButtonColor } from '../../../components/button-color/button-color';
import { CarrinhoService } from '../../../service/carrinho/carrinho.service';
import { signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { LoadingAnimate } from '../../../components/loadingAnimate/loading-animate/loading-animate';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ButtonColor, RouterLink, LoadingAnimate],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  produtos = signal<ProdutoProps[]>([]);
  isLoading = signal<boolean>(true);

  private carrinhoService = inject(CarrinhoService)
  private produtoService = inject(ProdutoService)
  private toast = inject(ToastrService);

  ngOnInit(): void {
    this.carregarDados();
  }

  getStock(id:number){
    return this.produtoService.getStock(id)
  }

  carregarDados() {
    this.isLoading.set(true); // é pra mostrar que ta carregando
    this.produtoService.getAll().subscribe({
      next: (dados: any) => {
        this.produtos.set(dados.products);
        // console.log('Produtos carregados:', this.produtos());
        this.isLoading.set(false); // muda para false com o .set, por causa do signal
      },
      error: (erro) => {
        // console.error('Erro:', erro);
        this.isLoading.set(false);
      },
    });
  }

  comprar(item: ProdutoProps) {
    if ((item.stock ?? 0) > 0) {
      this.carrinhoService.addToCart(item);
      this.produtoService.uptadeStock(item.id!,(item.stock! - 1))
      this.toast.success('Adiocionado ao carrinho', '', {
        timeOut: 3500,
        progressBar: true,
        positionClass: 'toast-bottom-right',
      });
    } else {
      this.toast.warning('produto ja esgotado', '', {
        timeOut: 3500,
        progressBar: true,
        positionClass: 'toast-bottom-right',
      });
    }
  }
}
