import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {


  constructor( private http: HttpClient) 
  { }

  

  subirArchivo (formData: FormData): Observable<any> {
   return this.http.post("http://localhost:8080/subir/archivo", formData);
  }
  
}


