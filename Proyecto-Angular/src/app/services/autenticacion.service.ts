import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs'; // behaviorsubject es otro observable que la diferencia con los normales es que tiene una noción de estado, 
                                                    // por lo que al suscribirse a este vamos a poder acceder al último valor disponible
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  url="http://localhost:8080/usuario/verificar";
  currentUserSubject!: BehaviorSubject<any>;


  constructor( private http:HttpClient) {
   }

IniciarSesion(credenciales:any){
  
}

get UsuarioAutenticado () {
  return this.currentUserSubject;
}

}
