import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Produto } from '../../service/produto';
import { ProdutoProps } from '../../Produto.model'; 

@Component({
  selector: 'app-product-block',
  imports: [CommonModule],
  templateUrl: './product-block.html',
  styleUrl: './product-block.scss',
})
export class ProductBlock implements OnInit {
  produtos: ProdutoProps[] = [];
  item: ProdutoProps = {} as ProdutoProps;

  ngOnInit(): void {
    this.carregarDados();
  }

  constructor(private Produto: Produto) {}

  carregarDados() {
    this.Produto.getAll().subscribe({
      next: (dados:any) => {
        this.produtos = dados.products;
        console.log(this.produtos);
      },
      error: (erro) => {
        console.error('Erro ao carregar produtos', erro); 
      },
      complete: () => {
        console.info('Requisição completa'); 
      },
    });

  }
}
