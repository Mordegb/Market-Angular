import { Routes } from '@angular/router';
import { Home } from './pages/home/home/home';
import { Carrinho } from './pages/carrinho/carrinho/carrinho';
import { Login } from './pages/login/login/login';
import { ProductDetails } from './pages/product-details/product-details/product-details';
import { authGuard} from '../guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'home', component: Home, canActivate: [authGuard] },
  { path: 'carrinho', component: Carrinho, canActivate: [authGuard] },
  { path: 'product/:id', component: ProductDetails, canActivate: [authGuard] },
];
