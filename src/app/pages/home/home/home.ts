import { Component } from '@angular/core';
import { ProductBlock } from '../../../components/product-block/product-block';

@Component({
  selector: 'app-home',
  imports: [ ProductBlock],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
