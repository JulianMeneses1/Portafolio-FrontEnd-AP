import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Banner } from '../interfaces/banner';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  
  constructor( private http:HttpClient) { }

  obtenerBanners (): Observable<Banner[]> {
    return this.http.get<Banner[]>("https://ap-portafolio-backend.onrender.com/obtener/banners")
  }

  editarBanner (banner:Banner): Observable<Banner> {
    const url:string=`${"https://ap-portafolio-backend.onrender.com/editar/banner"}/${banner.id}`; 
    return this.http.put<Banner>(url,banner,this.httpOptions)
  }
}


