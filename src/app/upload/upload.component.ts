import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
   //propiedad carga muestra carga en % => 100%
  public progress: number;
  //propiedad mensaje, muestra mensaje
  public message: string;
  
  //Propiedad para realizar la carga de imagen, para actuar con el evento emisor(EventEmitter)
  @Output() public onUploadFinished = new EventEmitter();
  //variable httpclient para acceder al servidor
  constructor(private http: HttpClient) { }
  ngOnInit() {
  }
  
  //Función de carga del archivo, verifica si existe un archivo, sino hay nada sale de la función
  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    
    //Extrae el archivo del parametro files - crea un formulario de datos
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);  //Agrega el archivo que se quiere cargar
    
     //Se crea la solicitud con la URL y objeto JSON y rastrea cambios en el progreso de solicitud HTTP
    this.http.post('https://localhost:5001/api/upload', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        //si esta en progreso, actualiza la variable de progreso y muestra el porcentaje de carga en pantalla
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
         // Finalizando la carga, muestra un mensaje en pantalla y emite un nuevo evento usando Emisor de Eventos
          else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          //Contiene el cuerpo de la respuesta, la ruta de la Base datos del archivo cargado
          //Esta ruta se necesita para mostrar imagen cargada con otros detalles de la publicación y poder mostrarla
          this.onUploadFinished.emit(event.body);
        }
      });
  }
}
