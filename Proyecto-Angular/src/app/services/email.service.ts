import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Email } from '../interfaces/email';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  constructor( private http: HttpClient) { }

  enviarEmail (datos: Email): Observable<Email> {
    return this.http.post<Email>("http://localhost:8080/enviarmail",datos,this.httpOptions)
  }
}

