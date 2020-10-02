import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //propiedad invalid login
  invalidLogin: boolean;

  constructor(private router: Router, private http: HttpClient) { }

  //Función inicio de sesion
  login(form: NgForm){
    //Se crean las propiedades para las credenciales
    const credentials = {
    'username': form.value.username,
    'password': form.value.password
    }

    //Función del endpoint inicio de sesión
    this.http.post("https://localhost:5001/api/auth/login", credentials)
     //Suscribimos la respuesta y extraemos el token de la respuesta
    .subscribe(data => {
      const token = (<any>data).token;
      //Propiedad token almacenamiento local
      localStorage.setItem("jwt", token);
      this.invalidLogin = false;
      this.router.navigate(["/home"]);
    }, err => {
      this.invalidLogin = true;
    })
  }

  refreshPage() {
    window.location.reload();
   }
}
