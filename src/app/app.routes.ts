import { Routes } from '@angular/router';
import { Home } from './pages/home/home/home';
import { Carrinho } from './pages/carrinho/carrinho/carrinho';

export const routes: Routes = [
    {path:'' ,redirectTo:'home',pathMatch:'full'},
    {path:'home' , component:Home},
    {path:'carrinho' , component:Carrinho},
];
