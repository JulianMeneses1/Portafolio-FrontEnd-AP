import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModoEdicionService {

  // Alternar modo edición 

  private modoEdicion:boolean=false;
  private subjectAlternarEdicion = new Subject<any>();

  // Alternar botón aceptar de los distintos formularios de edición

  private habilitarBotonLogin:boolean = true;  
  private subjectFormLogin = new Subject<any>();

  private habilitarBotonConocimientos:boolean = true;  
  private subjectFormConocimientos = new Subject<any>();

  private habilitarBotonExp:boolean = true;  
  private subjectFormExperiencia = new Subject<any>();

  private habilitarBotonProyectos:boolean = true;  
  private subjectFormProyectos = new Subject<any>();

  private habilitarBotonFormacion:boolean = true;  
  private subjectFormFormacion = new Subject<any>();

  private habilitarBotonContacto:boolean = true;  
  private subjectFormContacto = new Subject<any>();


  constructor() { }

  alternarEdicion():void{
    this.modoEdicion=!this.modoEdicion;
    this.subjectAlternarEdicion.next(this.modoEdicion)
  }

  toggleFormLogin () {
    this.habilitarBotonLogin=true;
    this.subjectFormLogin.next(this.habilitarBotonLogin)
  }

  toggleFormConocimientos () {
    this.habilitarBotonConocimientos=true;
    this.subjectFormConocimientos.next(this.habilitarBotonLogin)
  }
  toggleFormExperiencia () {
    this.habilitarBotonExp=true;
    this.subjectFormExperiencia.next(this.habilitarBotonExp)
  }
  toggleFormProyectos () {
    this.habilitarBotonProyectos=true;
    this.subjectFormProyectos.next(this.habilitarBotonProyectos)
  }
  toggleFormFormacion () {
    this.habilitarBotonFormacion=true;
    this.subjectFormFormacion.next(this.habilitarBotonFormacion)
  }
  toggleFormContacto () {
    this.habilitarBotonContacto=true;
    this.subjectFormContacto.next(this.habilitarBotonContacto)
  }

  onAlternar():Observable<any>{
    return this.subjectAlternarEdicion.asObservable();
  }
  onAlternarFormLogin():Observable<any>{
    return this.subjectFormLogin.asObservable()
  }
  onAlternarFormConocimientos():Observable<any>{
    return this.subjectFormConocimientos.asObservable()
  }
  onAlternarFormExperiencia():Observable<any>{
    return this.subjectFormExperiencia.asObservable()
  }
  onAlternarFormProyectos():Observable<any>{
    return this.subjectFormProyectos.asObservable()
  }
  onAlternarFormContacto():Observable<any>{
    return this.subjectFormContacto.asObservable()
  }
  onAlternarFormFormacion():Observable<any>{
    return this.subjectFormFormacion.asObservable()
  }
}






