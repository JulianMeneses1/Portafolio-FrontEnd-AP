import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conocimiento } from '../interfaces/conocimiento';

@Injectable({
  providedIn: 'root'
})
export class ConocimientoService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  constructor(private http: HttpClient) { }


  obtenerConocimientos (): Observable<Conocimiento[]> {
    return this.http.get<Conocimiento[]>("http://localhost:8080/obtener/conocimientos")
  }

  editarConocimiento (conocimiento:Conocimiento): Observable<Conocimiento> {
    const url:string=`${"http://localhost:8080/editar/conocimiento"}/${conocimiento.id}`; 
    return this.http.put<Conocimiento>(url,conocimiento,this.httpOptions)
  }

  eliminarConocimiento (id:number): Observable<Conocimiento> {
    const url:string=`${"http://localhost:8080/eliminar/conocimiento"}/${id}`; 
    return this.http.delete<Conocimiento>(url)
  }

  crearConocimiento (conocimiento:Conocimiento): Observable<Conocimiento> {
 
    return this.http.post<Conocimiento>("http://localhost:8080/crear/conocimiento",conocimiento,this.httpOptions)
  }
}
