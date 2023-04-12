import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs'; // behaviorsubject es otro observable que la diferencia con los normales es que tiene una noción de estado, 
                                                    // por lo que al suscribirse a este vamos a poder acceder al último valor disponible
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  url="http://localhost:8080/auth/login";
  currentUserSubject!: BehaviorSubject<any>;


  constructor( private http:HttpClient) {
    console.log("El servicio de autenticación está corriendo");
    this.currentUserSubject= new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser') || '{}'))
   }

IniciarSesion(credenciales:any):Observable<any> {
  return this.http.post(this.url,credenciales).pipe(map(data=>{
    sessionStorage.setItem('currentUser', JSON.stringify(data));
    this.currentUserSubject.next(data);

    return data;
  }))
}

get UsuarioAutenticado () {
  return this.currentUserSubject;
}

}
