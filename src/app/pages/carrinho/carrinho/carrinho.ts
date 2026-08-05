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
  calculado = this.carrinhoService.calculedValue


  ngOnInit() {
    this.updateList();
  }

  
  calculateTotal(): priceValues{
    return this.carrinhoService.totalValue();
  }
 

  updateList() {
    this.itensNoCarrinho = this.carrinhoService.getItens();
    this.calculateTotal();
  }

  removeItem(id: number) {//nescessita de refactor talvez paramentro quantitativo
    const originalStock = this.produtoService.getOriginalStock(id)
    this.carrinhoService.removeFromCart(id);
    this.updateList();
    this.toats.warning('Produto removido', '', {
      timeOut: 4000,
      progressBar: true,
      positionClass: 'toast-bottom-right',
    });
    this.produtoService.uptadeStock(id,originalStock)
  }

  purchase(finalValue:number): void {
    this.carrinhoService.clearCart();
    this.produtoService.setInitialValues()
    this.toats.success(`compra de ${finalValue}R$ efetuda`);
    this.updateList();
  }

  upQuantity(id: number, quantidadeAtual: number) {
    const stock = this.produtoService.getStock(id)
    this.carrinhoService.updateQuantity(id, quantidadeAtual + 1);
    this.produtoService.uptadeStock(id,stock - 1) 
    this.updateList();
  }
  
  downQuantity(id: number, quantidadeAtual: number) {
    const stock = this.produtoService.getStock(id)
    this.carrinhoService.updateQuantity(id, quantidadeAtual - 1);
    this.produtoService.uptadeStock(id,stock + 1)
    this.updateList();
  }
}
