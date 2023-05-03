import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Banner } from '../interfaces/banner';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  url:string = environment.apiURL
  
  constructor( private http:HttpClient) { }

  obtenerBanners (): Observable<Banner[]> {
    return this.http.get<Banner[]>(this.url+"obtener/banners")
  }

  editarBanner (banner:Banner): Observable<Banner> {
    const url:string=this.url+"editar/banner/"+banner.id; 
    return this.http.put<Banner>(url,banner,this.httpOptions)
  }
}


