import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs'; // behaviorsubject es otro observable que la diferencia con los normales es que tiene una noción de estado, 
                                                    // por lo que al suscribirse a este vamos a poder acceder al último valor disponible
import { catchError, map } from 'rxjs/operators';
import { Credenciales } from '../interfaces/credenciales-login';
@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  url="https://ap-portafolio-backend.onrender.com/login";
  // currentUserSubject!: BehaviorSubject<any>;

  constructor( private http:HttpClient) {
    // this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('token') || '{}'));
   }

  iniciarSesion(credenciales:Credenciales):Observable<any>{
    
    return this.http.post(this.url, credenciales, {
      observe: 'response'
    }).pipe(map((response: HttpResponse <any>)=>{

      const body = response.body;
      const headers = response.headers;

      const bearerToken = headers.get('Authorization')!;
      const token = bearerToken.replace('Bearer ', '');

      localStorage.setItem('token', token);  // hay dos storage, el local y el session. El local almacena los datos en el navegador de forma 
                                                                  // indefinida, hasta que se borra la cache. En cambio en el session los datos son guardados 
                                                                  // mientras dure la sesión, la cual finaliza al cerrarse la pestaña de la app en el navegador
      return body;
    }))
  }

  getToken () {
  return localStorage.getItem('token');
  }

}
