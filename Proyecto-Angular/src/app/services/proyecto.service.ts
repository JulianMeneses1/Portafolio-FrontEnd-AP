import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Proyecto } from '../interfaces/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  obtenerProyectos (): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>("http://localhost:8080/obtener/proyectos")
  }

  editarProyecto (proyecto:Proyecto): Observable<Proyecto> {
    const url:string=`${"http://localhost:8080/editar/proyecto"}/${proyecto.id}`; 
    return this.http.put<Proyecto>(url,proyecto,this.httpOptions)
  }

  eliminarProyecto (id:number): Observable<Proyecto> {
    const url:string=`${"http://localhost:8080/eliminar/proyecto"}/${id}`; 
    return this.http.delete<Proyecto>(url)
  }

  crearProyecto (proyecto:Proyecto): Observable<Proyecto> {
 
    return this.http.post<Proyecto>("http://localhost:8080/crear/proyecto",proyecto,this.httpOptions)
  }
}
