import { Component, inject } from '@angular/core';
import {
  FormsModule,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms'; //meu deus muitos imports
import { Router } from '@angular/router';
import { UserService } from '../../../service/user/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  router = inject(Router)
  userService = inject(UserService)
  toast = inject(ToastrService);

  loginForm = new FormGroup({
    //vai criar as coisas do grupo que tem que validar
    UserEmail: new FormControl('', [Validators.required, Validators.email]),
    UserPassword: new FormControl('', [Validators.required]),
  });

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    const emailDigitado = this.loginForm.value.UserEmail;
    const senhaDigitada = this.loginForm.value.UserPassword;

    this.userService.getAll().subscribe({
      next: (ListaUsuarios) => {
        //aqui vai meu array que ta no service
        const usuarioEncontrado = ListaUsuarios.find((u) => u.email === emailDigitado);

        //depois fazer um elif para limpar so ocampo de senha
        if (usuarioEncontrado && usuarioEncontrado.password === senhaDigitada) {
          console.log('deu certo o login', usuarioEncontrado);
          console.log(this.loginForm.value);
          this.router.navigate(['/home']); //vai levar pra home sem ser direto do html , aq fica mais simples
        } else if (usuarioEncontrado && usuarioEncontrado.password !== senhaDigitada) {
          this.loginForm.patchValue({ UserPassword: '' }); //posso setar o valor de uma so coisa, o setValue pede tudo
          this.toast.warning('senha incorreta', '', {
            timeOut: 3000,
            progressBar: true,
          });
        } else {
          this.toast.error('usuario inexistente', '', {
            timeOut: 4000,
            progressBar: true,
          });
          this.loginForm.setValue({ UserEmail: '', UserPassword: '' }); // seta os valores do input para deixar vazio
          // this.loginForm.reset() // faz a mesma coisa que o de cima (é so uma anotação)
        }
      },
    });
  }

  useTestAccount() {
   this.loginForm.setValue({
        UserEmail: 'emily.johnson@x.dummyjson.com',
        UserPassword: 'emilyspass',
      })
  }

  inputType: string = 'password';
  switchType() {
    this.inputType = this.inputType === 'password' ? 'text' : 'password';
  }

  fazerLogin() {
    //guardada so pra exemplo de emit, mas não utilizada
    if (this.loginForm.valid) {
      //vai criar as coisas do grupo que tem que validar
      console.log(this.loginForm.value);
      alert(this.loginForm.value);
    } else {
      alert('preencha os campos corretamente');
    }
  }
}
