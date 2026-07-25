import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrinhoService, ItemCarrinho ,priceValues} from '../../../service/carrinho/carrinho.service';
import { ButtonColor } from '../../../components/button-color/button-color';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-carrinho',
  imports: [CommonModule, ButtonColor],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.scss',
})
export class Carrinho implements OnInit {
  private service = inject(CarrinhoService);
  private toats = inject(ToastrService);
  itensNoCarrinho: ItemCarrinho[] = [];
  isLoading = this.service.isLoading
  state = this.service.ApiState
  calculado = this.service.calculedValue


   ngOnInit() {
    this.atualizarLista();
  }

  
  calcularTotal(): priceValues{
    const desconto = (this.state()?.discountedTotal ?? 0)
    return this.service.valorTotal(desconto);
  }
 

  atualizarLista() {
    this.itensNoCarrinho = this.service.obterItens();
    this.calcularTotal();
  }

  remover(id: number) {
    this.service.removeFromCart(id);
    this.atualizarLista();
    this.toats.warning('Produto removido', '', {
      timeOut: 4000,
      progressBar: true,
      positionClass: 'toast-bottom-right',
    });
  }

  finalizarCompra(finalValue:number): void {
    this.service.limparCarrinho();
    this.toats.success(`compra de ${finalValue} efetuda`);
    this.atualizarLista();
  }

  aumentarQuantidade(id: number, quantidadeAtual: number) {
    this.service.atualizarQuantidade(id, quantidadeAtual + 1);
    this.atualizarLista();
  }

  diminuirQuantidade(id: number, quantidadeAtual: number) {
    this.service.atualizarQuantidade(id, quantidadeAtual - 1);
    this.atualizarLista();
  }
}
