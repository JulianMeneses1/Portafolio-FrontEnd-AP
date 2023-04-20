import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  url:string = "http://localhost:8080/obtener/banners"
  
  constructor( private http:HttpClient) { }

  obtenerDatos (): Observable<any> {
    return this.http.get<any>(this.url)
  }

  editarDatos (banner:any): Observable<any> {
    const url:string=`${"http://localhost:8080/editar/banner"}/${banner.id}`; 
    console.log(JSON.stringify(banner))
    return this.http.put<any>(url,banner,this.httpOptions)
  }
}


