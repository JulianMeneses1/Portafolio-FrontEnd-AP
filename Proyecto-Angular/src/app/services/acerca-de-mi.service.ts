import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AcercaDeMi } from '../interfaces/acerca-de-mi';

@Injectable({
  providedIn: 'root'
})
export class AcercaDeMiService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  
  constructor( private http: HttpClient) { }

  obtenerAcercaDeMi (): Observable<AcercaDeMi[]> {
    return this.http.get<AcercaDeMi[]>("http://localhost:8080/obtener/acercademi")
  }

  editarAcercaDeMi (acercademi:AcercaDeMi): Observable<AcercaDeMi> {
    const url:string=`${"http://localhost:8080/editar/acercademi"}/${acercademi.id}`; 
    return this.http.put<AcercaDeMi>(url,acercademi,this.httpOptions)
  }
}
