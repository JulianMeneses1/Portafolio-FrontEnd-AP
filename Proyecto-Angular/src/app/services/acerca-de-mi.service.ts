import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  obtenerDatos (): Observable<any> {
    return this.http.get<any>("http://localhost:8080/obtener/acercademi")
  }

  editarDatos (acercademi:any): Observable<any> {
    const url:string=`${"http://localhost:8080/editar/acercademi"}/${acercademi.id}`; 
    return this.http.put<any>(url,acercademi,this.httpOptions)
  }
}
