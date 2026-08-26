import { Component, inject, signal } from '@angular/core';
import {
  FormsModule,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms'; //meu deus muitos imports
import { Router } from '@angular/router';
import { UserService } from '../../../service/user/user.service';
import { AuthService } from '../../../service/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  router = inject(Router);
  userService = inject(UserService);
  authService = inject(AuthService);
  toast = inject(ToastrService);
  isLoading = signal(false);

  loginForm = new FormGroup({
    //vai criar as coisas do grupo que tem que validar
    UserEmail: new FormControl('', [Validators.required, Validators.email]),
    UserPassword: new FormControl('', [Validators.required]),
  });

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    const email = this.loginForm.value.UserEmail ?? '';
    const password = this.loginForm.value.UserPassword ?? '';

    this.isLoading.set(true);

    this.authService.login(email, password).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/home']);
      },
      error: (erro) => {
        this.logout()
        this.isLoading.set(false);

        if (erro?.code === 'USER_NOT_FOUND') {
          this.toast.error('usuario inexistente', '', {
            timeOut: 4000,
            progressBar: true,
          });
          this.loginForm.setValue({ UserEmail: '', UserPassword: '' });
        } else {
          this.loginForm.patchValue({ UserPassword: '' });
          this.toast.warning('senha incorreta', '', {
            timeOut: 3000,
            progressBar: true,
          });
        }
      },
    });
  }

  useTestAccount() {
    this.loginForm.setValue({
      UserEmail: 'emily.johnson@x.dummyjson.com',
      UserPassword: 'emilyspass',
    });
  }

  inputType: string = 'password';
  switchType() {
    this.inputType = this.inputType === 'password' ? 'text' : 'password';
  }

  logout(){
    this.authService.logout()
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
