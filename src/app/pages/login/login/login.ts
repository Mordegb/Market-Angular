import { Component } from '@angular/core';
import { FormsModule,FormControl,FormGroup,Validators , ReactiveFormsModule} from '@angular/forms';
import { form } from '@angular/forms/signals';
@Component({
  selector: 'app-login',
  imports: [FormsModule , ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {


 loginForm = new FormGroup({ //vai criar as coisas do grupo que tem que validar
  UserEmail: new FormControl('',[Validators.required , Validators.email]),
  UserPassword: new FormControl('',[Validators.required])
 });

 fazerLogin() {
   if(this.loginForm.valid){//verifica se as informações estão valido
    console.log(this.loginForm.value)
    alert(this.loginForm.value)
   }
   else{
    alert("preencha os campos corretamente")
   }
  }
}
