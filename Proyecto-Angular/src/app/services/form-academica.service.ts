import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Educacion } from '../interfaces/formacion-academica';

@Injectable({
  providedIn: 'root'
})
export class FormAcademicaService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  constructor(private http: HttpClient) { }


  obtenerFormaciones (): Observable<Educacion[]> {
    return this.http.get<Educacion[]>("http://localhost:8080/obtener/formaciones")
  }

  editarFormacion(formacion:Educacion): Observable<Educacion> {
    const url:string=`${"http://localhost:8080/editar/formacion"}/${formacion.id}`; 
    return this.http.put<Educacion>(url,formacion,this.httpOptions)
  }

  eliminarFormacion(id:number): Observable<Educacion> {
    const url:string=`${"http://localhost:8080/eliminar/formacion"}/${id}`; 
    return this.http.delete<Educacion>(url)
  }

  crearFormacion(formacion:Educacion): Observable<Educacion> {
 
    return this.http.post<Educacion>("http://localhost:8080/crear/formacion",formacion,this.httpOptions)
  }
}
