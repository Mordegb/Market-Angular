import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  UserEmail: string = '';
  UserPassword: string = '';
 fazerLogin() {
    console.log('Email:', this.UserEmail);
    console.log('Senha:', this.UserPassword);
    alert(`nome: ${this.UserEmail} , e ${this.UserPassword}`)
  }
}
