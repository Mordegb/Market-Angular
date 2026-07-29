import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrinhoService, ItemCarrinho ,priceValues} from '../../../service/carrinho/carrinho.service';
import { ButtonColor } from '../../../components/button-color/button-color';
import { ToastrService } from 'ngx-toastr';
import { ProdutoService } from '../../../service/produto/produto.service';

@Component({
  selector: 'app-carrinho',
  imports: [CommonModule, ButtonColor],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.scss',
})
export class Carrinho implements OnInit {
  private carrinhoService = inject(CarrinhoService);
  private toats = inject(ToastrService);
  private produtoService = inject(ProdutoService)
  itensNoCarrinho: ItemCarrinho[] = [];
  isLoading = this.carrinhoService.isLoading
  state = this.carrinhoService.ApiState


   ngOnInit() {
    this.atualizarLista();
  }

  
  calcularTotal(): priceValues{
    const desconto = (this.state()?.discountedTotal ?? 0)
    return this.carrinhoService.valorTotal(desconto);
  }
 

  atualizarLista() {
    this.itensNoCarrinho = this.carrinhoService.obterItens();
    this.calcularTotal();
  }

  remover(id: number) {
    this.carrinhoService.removeFromCart(id);
    this.atualizarLista();
    this.toats.warning('Produto removido', '', {
      timeOut: 4000,
      progressBar: true,
      positionClass: 'toast-bottom-right',
    });
  }

  finalizarCompra(finalValue:number): void {
    this.carrinhoService.limparCarrinho();
    this.produtoService.setInitialValues()
    this.toats.success(`compra de ${finalValue} efetuda`);
    this.atualizarLista();
  }

  aumentarQuantidade(id: number, quantidadeAtual: number) {
    const stock = this.produtoService.getStock(id)
    this.carrinhoService.atualizarQuantidade(id, quantidadeAtual + 1);
    this.produtoService.uptadeStock(id,stock - 1) 
    this.atualizarLista();
  }
  
  diminuirQuantidade(id: number, quantidadeAtual: number) {
    const stock = this.produtoService.getStock(id)
    this.carrinhoService.atualizarQuantidade(id, quantidadeAtual - 1);
    this.produtoService.uptadeStock(id,stock + 1)
    this.atualizarLista();
  }
}
