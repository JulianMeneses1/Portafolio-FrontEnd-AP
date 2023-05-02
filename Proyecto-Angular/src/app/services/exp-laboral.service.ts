import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Experiencia } from '../interfaces/experiencia-laboral';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpLaboralService {

  private exp!:Experiencia;
  private subjectActualizarExp = new Subject<Experiencia>();

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  obtenerExperiencias (): Observable<Experiencia[]> {
    return this.http.get<Experiencia[]>("https://ap-portafolio-backend.onrender.com/obtener/experiencias")
  }

  editarExperiencia(experiencia:Experiencia): Observable<Experiencia> {
    const url:string=`${"https://ap-portafolio-backend.onrender.com/editar/experiencia"}/${experiencia.id}`; 
    return this.http.put<Experiencia>(url,experiencia,this.httpOptions)
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
    const url:string=`${"https://ap-portafolio-backend.onrender.com/eliminar/experiencia"}/${id}`; 
    return this.http.delete<Experiencia>(url)
  }

  crearExperiencia(experiencia:Experiencia): Observable<Experiencia> {
 
    return this.http.post<Experiencia>("https://ap-portafolio-backend.onrender.com/crear/experiencia",experiencia,this.httpOptions)
  }
}
