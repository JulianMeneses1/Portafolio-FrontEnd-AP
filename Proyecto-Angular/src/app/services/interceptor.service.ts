import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutenticacionService } from './autenticacion.service';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private servicioAutenticacion: AutenticacionService) { }

  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let currentUser=this.servicioAutenticacion.UsuarioAutenticado;

    // if(currentUser && currentUser.) {
    //   req=req.clone({
    //     setHeaders:{
    //       Authorization: `Bearer ${currentUser.accessToken}`
    //     }
    //   })
    // }

    return next.handle(req);
  }
}
