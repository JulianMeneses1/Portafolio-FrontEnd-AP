import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conocimiento } from '../interfaces/conocimiento';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConocimientoService {

  url:string = environment.apiURL

  constructor(private http: HttpClient) { }


  obtenerConocimientos (): Observable<Conocimiento[]> {
    return this.http.get<Conocimiento[]>(this.url+"obtener/conocimientos")
  }

  editarConocimiento (conocimiento:Conocimiento): Observable<Conocimiento> {
    const url:string=this.url+"editar/conocimiento/"+conocimiento.id; 
    return this.http.put<Conocimiento>(url,conocimiento)
  }

  eliminarConocimiento (id:number): Observable<Conocimiento> {
    const url:string=this.url+"eliminar/conocimiento/"+id; 
    return this.http.delete<Conocimiento>(url)
  }

  crearConocimiento (conocimiento:Conocimiento): Observable<Conocimiento> {
 
    return this.http.post<Conocimiento>(this.url+"crear/conocimiento",conocimiento)
  }
}
