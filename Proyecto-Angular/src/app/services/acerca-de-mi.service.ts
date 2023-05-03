import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AcercaDeMi } from '../interfaces/acerca-de-mi';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AcercaDeMiService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  url: string = environment.apiURL  
  
  constructor( private http: HttpClient) { }

  obtenerAcercaDeMi (): Observable<AcercaDeMi[]> {
    return this.http.get<AcercaDeMi[]>(this.url+"obtener/acercademi")
  }

  editarAcercaDeMi (acercademi:AcercaDeMi): Observable<AcercaDeMi> {
    const url:string =this.url+"editar/acercademi/"+acercademi.id 
    return this.http.put<AcercaDeMi>(url,acercademi,this.httpOptions)
  }
}
