import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TituloSeccionesService {

  url:string = environment.apiURL
  constructor( private http: HttpClient) { }

  obtenerTitulos (): Observable<any> {
    return this.http.get<any>(this.url+"obtener/titulosecciones")
    
  }

  editarTitulo (titulo:any): Observable<any> {
    const url:string=this.url+"editar/tituloseccion/"+titulo.id; 
    return this.http.put<any>(url,titulo)
  }
}
