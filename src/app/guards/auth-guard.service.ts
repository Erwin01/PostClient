import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private jwtHelper: JwtHelperService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    throw new Error('Method not implemented.');
  }
  

  //Guardia que protege las rutas angulares
  canActive(){
    //Obtiene el token local
    const token = localStorage.getItem("jwt");
    //Valida si el token ya expiró
    if(token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }
    this.router.navigate(["login"]);
    return false;
  }

}