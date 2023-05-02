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
    return this.http.get<Conocimiento[]>("https://ap-portafolio-backend.onrender.com/obtener/conocimientos")
  }

  editarConocimiento (conocimiento:Conocimiento): Observable<Conocimiento> {
    const url:string=`${"https://ap-portafolio-backend.onrender.com/editar/conocimiento"}/${conocimiento.id}`; 
    return this.http.put<Conocimiento>(url,conocimiento,this.httpOptions)
  }

  eliminarConocimiento (id:number): Observable<Conocimiento> {
    const url:string=`${"https://ap-portafolio-backend.onrender.com/eliminar/conocimiento"}/${id}`; 
    return this.http.delete<Conocimiento>(url)
  }

  crearConocimiento (conocimiento:Conocimiento): Observable<Conocimiento> {
 
    return this.http.post<Conocimiento>("https://ap-portafolio-backend.onrender.com/crear/conocimiento",conocimiento,this.httpOptions)
  }
}
