import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Experiencia } from '../interfaces/experiencia-laboral';
import { Observable, Subject } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpLaboralService {

  private exp!:Experiencia;
  private subjectActualizarExp = new Subject<Experiencia>();
  url:string = environment.apiURL

  constructor(private http: HttpClient) { }

  obtenerExperiencias (): Observable<Experiencia[]> {
    return this.http.get<Experiencia[]>(this.url+"obtener/experiencias")
  }

  editarExperiencia(experiencia:Experiencia): Observable<Experiencia> {
    const url:string=this.url+"editar/experiencia/"+experiencia.id; 
    return this.http.put<Experiencia>(url,experiencia)
  }

  // para actualizar el componente hijo de experiencia que utiliza ruta dinámica
  
  actualizarExpItem(experiencia:Experiencia):void{
    this.exp=experiencia;
    this.subjectActualizarExp.next(this.exp)
  }
  
  onActualizarExpItem():Observable<Experiencia>{
    return this.subjectActualizarExp.asObservable();
  }

  eliminarExperiencia(id:number): Observable<Experiencia> {
    const url:string=this.url+"eliminar/experiencia/"+id; 
    return this.http.delete<Experiencia>(url)
  }

  crearExperiencia(experiencia:Experiencia): Observable<Experiencia> {
 
    return this.http.post<Experiencia>(this.url+"crear/experiencia",experiencia)
  }
}
