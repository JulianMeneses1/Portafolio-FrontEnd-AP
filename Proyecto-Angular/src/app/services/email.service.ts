import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Email } from '../interfaces/email';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  url:string = environment.apiURL

  constructor( private http: HttpClient) { }

  enviarEmail (datos: Email): Observable<Email> {
    return this.http.post<Email>(this.url+"enviarmail",datos,this.httpOptions)
  }
}

