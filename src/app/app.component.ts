import { UserCreate } from './interfaces/userCreate.model';
import { User } from './interfaces/user.model';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public isCreate: boolean;
  public title: string;
  public content: string;
  public dateCreate: Date;
  public user: UserCreate;
  public users: User[] = [];
  //propiedad de respuesta/archivo cargado
  public response: {dbPath: ''};

  constructor(private http: HttpClient){}

  ngOnInit(){
    //Carga el index en pantalla
    this.getUsers();
    //this.isCreate = true;
  }
  
  //Función para recargar un nuevo post(index)
  refreshPage() {
    window.location.reload();
   }

  public onCreate = () => {
    this.user = {
      title: this.title,
      content: this.content,
      imgPath: this.response.dbPath, //agrega la propiedad de ruta de la imagen
      dateCreate: this.dateCreate
    }

    //Función para guardar una publicacion
    this.http.post('https://localhost:5001/api/posts', this.user)
    .subscribe(data => {
      this.getUsers();
      this.isCreate = false;
    });
  }

  //Funcion para obtener todas las publicaciones  
  private getUsers = () => {
    this.http.get('https://localhost:5001/api/posts')
    .subscribe(data => {
      this.users = data as User[];
    });
  }

  //función para regresar a crear nueva publicacion
  public returnToCreate = () => {
    this.isCreate = true;
    this.title = '';
    this.content = '';
    this.dateCreate = this.dateCreate;
  }
  
  //Función para cargar finalizada
  public uploadFinished = (event) => {
    //Se obtiene el objeto de respuesta, encuentra una ruta para guardar en la base de datos
    this.response = event;
  }

   //Funcion para agregar la imagen de creación o creada
  public createImgPath = (serverPath: string) => {
    return `https://localhost:5001/${serverPath}`;
  }

  logOut(){
    //Llamar funcion de eliminar
    localStorage.removeItem("jwt");
    
  }
  
}
