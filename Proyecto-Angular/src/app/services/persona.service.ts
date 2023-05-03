import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from '../interfaces/persona';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  url:string = environment.apiURL

  constructor( private http: HttpClient) { } 

  obtenerPersonas (): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.url+"obtener/personas")
  }

  editarPersona (persona: Persona): Observable<Persona> {
    const url= this.url + "editar/persona/"+persona.id
    return this.http.put<Persona>(url,persona,this.httpOptions);
  }
}
