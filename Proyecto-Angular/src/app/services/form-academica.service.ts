import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Formacion } from '../interfaces/formacion-academica';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormAcademicaService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  url:string = environment.apiURL

  constructor(private http: HttpClient) { }


  obtenerFormaciones (): Observable<Formacion[]> {
    return this.http.get<Formacion[]>(this.url+"obtener/formaciones")
  }

  editarFormacion(formacion:Formacion): Observable<Formacion> {
    const url:string=this.url+"editar/formacion/"+formacion.id; 
    return this.http.put<Formacion>(url,formacion,this.httpOptions)
  }

  eliminarFormacion(id:number): Observable<Formacion> {
    const url:string=this.url+"eliminar/formacion/"+id; 
    return this.http.delete<Formacion>(url)
  }

  crearFormacion(formacion:Formacion): Observable<Formacion> {
 
    return this.http.post<Formacion>(this.url+"crear/formacion",formacion,this.httpOptions)
  }
}
