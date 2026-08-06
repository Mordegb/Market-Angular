import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../../../service/produto/produto.service';
import { ProdutoProps } from '../../../Produto.model';
import { ButtonColor } from '../../../components/button-color/button-color';
import { CarrinhoService } from '../../../service/carrinho/carrinho.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingAnimate } from '../../../components/loadingAnimate/loading-animate/loading-animate';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, ButtonColor, LoadingAnimate],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails implements OnInit {
  produto = signal<ProdutoProps | null>(null);
  isLoading = signal<boolean>(false);
  asError = signal<boolean>(false);
  
  private actvRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private produtoService = inject(ProdutoService);
  private carrinhoService = inject(CarrinhoService);
  private toast = inject(ToastrService);

  ngOnInit(): void {
    this.actvRoute.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (id) {
        this.loadProduct(id);
      }
    });
  }

  loadProduct(id: number) {
    this.isLoading.set(true);
    this.asError.set(false);

    this.produtoService.getSingle(id).subscribe({
      next: (dados) => {
        this.produto.set(dados);
        this.isLoading.set(false);
      },
      error: (erro) => {
        console.error(erro);
        this.asError.set(true);
        this.isLoading.set(false);
      },
    });
  }

  getStock(id: number) {
    return this.produtoService.getStock(id);
  }

  navigation(id: number) {
    this.router.navigate(['/product', id]);
  }

  nextProduct() {
    const item = this.produto();
    if (item?.id !== undefined) {
      // this.carregarProduto(item.id += 1)
      this.navigation((item.id += 1));
    }
  }

  previousProduct() {
    const item = this.produto();
    if (item?.id !== undefined) {
      // this.carregarProduto(item.id -= 1)
      this.navigation((item.id -= 1));
    }
  }

  addTocart(item: ProdutoProps) {
    const stock = this.produtoService.getStock((item.id ?? 0))
    if ((stock ?? 0) > 0) {
      this.carrinhoService.addToCart(item);
      this.produtoService.uptadeStock(item.id!,(stock - 1))
      this.toast.success('Adiocionado ao carrinho', '', {
        timeOut: 3500,
        progressBar: true,
        positionClass: 'toast-bottom-right',
      });
    } else {
      this.toast.warning('produto ja esgotado', '', {
        timeOut: 3500,
        progressBar: true,
        positionClass: 'toast-top-right',
      });
    }
  }

  back() {
    this.router.navigate(['/home']);
  }
}
