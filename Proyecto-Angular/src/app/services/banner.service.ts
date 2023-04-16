import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  url:string = "http://localhost:8080/banner/traer"
  constructor( private http:HttpClient) { }

  obtenerDatos (): Observable<any> {
    return this.http.get<any>(this.url)
  }
}
