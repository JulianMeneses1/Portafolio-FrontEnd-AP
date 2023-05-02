import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Formacion } from '../interfaces/formacion-academica';

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


  obtenerFormaciones (): Observable<Formacion[]> {
    return this.http.get<Formacion[]>("https://ap-portafolio-backend.onrender.com/obtener/formaciones")
  }

  editarFormacion(formacion:Formacion): Observable<Formacion> {
    const url:string=`${"https://ap-portafolio-backend.onrender.com/editar/formacion"}/${formacion.id}`; 
    return this.http.put<Formacion>(url,formacion,this.httpOptions)
  }

  eliminarFormacion(id:number): Observable<Formacion> {
    const url:string=`${"https://ap-portafolio-backend.onrender.com/eliminar/formacion"}/${id}`; 
    return this.http.delete<Formacion>(url)
  }

  crearFormacion(formacion:Formacion): Observable<Formacion> {
 
    return this.http.post<Formacion>("https://ap-portafolio-backend.onrender.com/crear/formacion",formacion,this.httpOptions)
  }
}
