import { Component } from '@angular/core';
import { NavBar } from '../../../components/nav-bar/nav-bar';
import { ProductBlock } from '../../../components/product-block/product-block';

@Component({
  selector: 'app-home',
  imports: [ ProductBlock,NavBar],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
