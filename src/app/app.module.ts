import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
//npm install @auth0/angular-jwt --save
//import library
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { UploadComponent } from './upload/upload.component';
import { AuthGuard } from './guards/auth-guard.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';

//Funcion para la obtención de tokens
export function tokenGetter(){
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    HomeComponent,
    LoginComponent,
    CustomersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'customers', component: CustomersComponent, canActivate: [AuthGuard]},
  ]),
   //Configurar módulo llamando la función raiz
   JwtModule.forRoot({
    config:{
      tokenGetter: tokenGetter,
      //Agrega uri del servidor
      allowedDomains: ["localhost:5001"],
      disallowedRoutes:[]
    }
  })
],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
