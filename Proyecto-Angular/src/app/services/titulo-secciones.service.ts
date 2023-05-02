import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TituloSeccionesService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  constructor( private http: HttpClient) { }

  obtenerTitulos (): Observable<any> {
    return this.http.get<any>("https://ap-portafolio-backend.onrender.com/obtener/titulosecciones")
    
  }

  editarTitulo (titulo:any): Observable<any> {
    const url:string=`${"https://ap-portafolio-backend.onrender.com/editar/tituloseccion"}/${titulo.id}`; 
    return this.http.put<any>(url,titulo,this.httpOptions)
  }
}
