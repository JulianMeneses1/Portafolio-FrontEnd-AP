import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Proyecto } from '../interfaces/proyecto';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  url:string = environment.apiURL

  constructor(private http: HttpClient) { }

  obtenerProyectos (): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(this.url+"obtener/proyectos")
  }

  editarProyecto (proyecto:Proyecto): Observable<Proyecto> {
    const url:string=this.url+"editar/proyecto/"+proyecto.id; 
    return this.http.put<Proyecto>(url,proyecto)
  }

  eliminarProyecto (id:number): Observable<Proyecto> {
    const url:string=this.url+"eliminar/proyecto/"+id; 
    return this.http.delete<Proyecto>(url)
  }

  crearProyecto (proyecto:Proyecto): Observable<Proyecto> {
 
    return this.http.post<Proyecto>(this.url+"crear/proyecto",proyecto)
  }
}
