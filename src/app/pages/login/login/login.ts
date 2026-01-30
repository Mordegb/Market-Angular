import { Component } from '@angular/core';
import { Produto } from '../../../service/produto';
import {
  FormsModule,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms'; //meu deus muitos imports
import { Router } from '@angular/router';
import { form } from '@angular/forms/signals';
import { UserService } from '../../../service/user/user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  constructor(private Userservice: UserService , private router: Router , private produtoService:Produto) {}

  loginForm = new FormGroup({  //vai criar as coisas do grupo que tem que validar
    UserEmail: new FormControl('', [Validators.required, Validators.email]),
    UserPassword: new FormControl('', [Validators.required]),
  });

  loginSucesfull = false;
  buscarUsuario() {
    if (this.loginForm.invalid){
      return;
    } 
    const emailDigitado = this.loginForm.value.UserEmail;
    const senhaDigitada = this.loginForm.value.UserPassword;

    this.Userservice.getAll().subscribe({
      next: (usuarios) => {
        const usuarioEncontrado = usuarios.find((u) => u.email === emailDigitado);

        if (usuarioEncontrado && usuarioEncontrado.password === senhaDigitada) {
          console.log('deu certo o login' , usuarioEncontrado);
          this.produtoService.getAll().subscribe()
          this.router.navigate(['/home']); //vai levar pra home sem ser direto do html , aq fica mais simples
        } else {
          alert('usuario não encontrado ou casastrado');
        }
      },
    });
  }

  fazerLogin() {
    if (this.loginForm.valid) {  //vai criar as coisas do grupo que tem que validar
      console.log(this.loginForm.value);
      alert(this.loginForm.value);
    } else {
      alert('preencha os campos corretamente');
    }
  }
}
