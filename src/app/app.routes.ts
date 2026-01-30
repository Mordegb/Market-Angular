import { Routes } from '@angular/router';
import { Home } from './pages/home/home/home';
import { Carrinho } from './pages/carrinho/carrinho/carrinho';
import { Login } from './pages/login/login/login';

export const routes: Routes = [
    {path:'' ,redirectTo:'login',pathMatch:'full'},
    {path:'login' , component:Login},
    {path:'home' , component:Home},
    {path:'carrinho' , component:Carrinho},
];
