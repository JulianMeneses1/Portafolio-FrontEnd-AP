import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { map } from 'rxjs/operators';
import { Credenciales } from '../interfaces/credenciales-login';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  url:string =environment.apiURL;

  constructor( private http:HttpClient) { }

  iniciarSesion(credenciales:Credenciales):Observable<any>{
    
    return this.http.post(this.url+"login", credenciales, {
      observe: 'response'
    }).pipe(map((response: HttpResponse <any>)=>{

      const body = response.body;
      const headers = response.headers;

      const bearerToken = headers.get('Authorization')!;
      const token = bearerToken.replace('Bearer ', '');

      sessionStorage.setItem('token', token);  // hay dos storage, el local y el session. El local almacena los datos en el navegador de forma 
                                                                  // indefinida, hasta que se borra la cache. En cambio en el session los datos son guardados 
                                                                  // mientras dure la sesión, la cual finaliza al cerrarse la pestaña de la app en el navegador
      return body;
    }))
  }

  getToken () {
  return sessionStorage.getItem('token');
  }

}
