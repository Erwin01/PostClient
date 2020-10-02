import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent {

  constructor(private router: Router, private jwtHelper: JwtHelperService) {
  }

  //Función usuario es autenticado
  isUserAuthenticated() {
    const token: string = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }

  //Función cierre de sesion
  logOut(){
  //Llamar funcion de eliminar
  localStorage.removeItem("jwt");
}

}
