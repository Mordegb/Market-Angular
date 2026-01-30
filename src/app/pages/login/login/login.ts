import { Component } from '@angular/core';
import {
  FormsModule,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
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
  constructor(private Userservice: UserService , private router: Router) {}

  loginForm = new FormGroup({
    //vai criar as coisas do grupo que tem que validar
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
          console.log('deu certo o login');
          this.router.navigate(['/home']);
        } else {
          alert('usuario ou senha incorretoss');
        }
      },
    });
  }

  fazerLogin() {
    if (this.loginForm.valid) {
      //verifica se as informações estão valido
      console.log(this.loginForm.value);
      alert(this.loginForm.value);
    } else {
      alert('preencha os campos corretamente');
    }
  }
}
