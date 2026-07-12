import { Component, inject, OnInit,signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../../../service/produto/produto.service';
import { ProdutoProps } from '../../../Produto.model';
import { ButtonColor } from '../../button-color/button-color';
import { CarrinhoService} from '../../../service/carrinho/carrinho.service';
import { ActivatedRoute , Router} from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule,ButtonColor],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails implements OnInit {

  produto = signal<ProdutoProps|null>(null)
  isLoading = signal<boolean>(false)
  asError = signal<boolean>(false)

  private actvRoute = inject(ActivatedRoute)
  private router = inject(Router)
  private produtoService = inject(ProdutoService)
  private carrinhoService = inject(CarrinhoService)


  ngOnInit(): void {
    this.actvRoute.paramMap.subscribe((params) =>{
      const id = Number(params.get('id'));
      if(id){
        this.carregarProduto(id)
      }
    })
  }

  carregarProduto(id:number){
    this.isLoading.set(true)
    this.asError.set(false)

    this.produtoService.getSingle(id).subscribe({
      next: (dados) =>{
        this.produto.set(dados);
        this.isLoading.set(false)
      },
      error:(erro) =>{
        console.error(erro)
        this.asError.set(true)
        this.isLoading.set(false)
      }
    })
  }

  navigation(id:number){
  this.router.navigate(['/product',id])
  }

  nextProduct(){
    const item = this.produto()
    if(item?.id !== undefined){
      // this.carregarProduto(item.id += 1)
      this.navigation(item.id += 1)
    }
  }

  beforeProduct(){
    const item = this.produto()
    if(item?.id !== undefined){
      // this.carregarProduto(item.id -= 1)
      this.navigation(item.id -= 1)
    }
  }


  adicionarAoCarrinho(){
    const item = this.produto()
    if(item){
      this.carrinhoService.adicionarAoCarrinho(item)
    }
    if(item?.stock !== undefined){
      item.stock -= 1
    }
  }

  voltar() { this.router.navigate(['/home']); }
}
