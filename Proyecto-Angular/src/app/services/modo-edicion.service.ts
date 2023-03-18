import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModoEdicionService {

  private modoEdicion:boolean=false;
  private habilitarBotonLogin:boolean = true;
  private subjectAlternarEdicion = new Subject<any>();
  private subjectBtnLoggin = new Subject<any>();


  constructor() { }

  alternarEdicion():void{
    this.modoEdicion=!this.modoEdicion;
    this.subjectAlternarEdicion.next(this.modoEdicion)
  }

  toggleBtnLoggin () {
    this.habilitarBotonLogin=true;
    this.subjectBtnLoggin.next(this.habilitarBotonLogin)
  }

  onAlternar():Observable<any>{
    return this.subjectAlternarEdicion.asObservable();
  }
  onAlternarBtnLoggin():Observable<any>{
    return this.subjectBtnLoggin.asObservable()
  }
}






