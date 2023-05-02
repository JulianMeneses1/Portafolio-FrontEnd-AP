import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from '../interfaces/persona';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  constructor( private http: HttpClient) { } 

  obtenerPersonas (): Observable<Persona[]> {
    return this.http.get<Persona[]>("https://ap-portafolio-backend.onrender.com/obtener/personas")
  }

  editarPersona (persona: Persona): Observable<Persona> {
    return this.http.put<Persona>(`${"https://ap-portafolio-backend.onrender.com/editar/persona"}/${persona.id}`,persona,this.httpOptions);
  }
}
