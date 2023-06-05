import { Injectable } from '@angular/core';
import { AutenticacionService } from './autenticacion.service';
import { HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(
    private servicioAutenticacion: AutenticacionService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = this.servicioAutenticacion.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type':'application/json'
    })

    if (token) {
      const cloned = request.clone ({
        headers
      })
      // añade a la solicitud la cabecera Authorization con el token 
      return next.handle(cloned);
    }
    // si no hay un token en el Session Storage, entonces deja pasar la solicitud sin añadirle nada
    return next.handle(request);
  }
}
