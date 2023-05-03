import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {

  url: string = environment.apiURL


  constructor( private http: HttpClient) 
  { }  

  subirArchivo (formData: FormData): Observable<any> {
   return this.http.post(this.url+"subir/archivo", formData);
  }
  
}


