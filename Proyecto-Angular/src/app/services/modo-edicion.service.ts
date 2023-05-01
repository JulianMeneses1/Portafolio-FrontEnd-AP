import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModoEdicionService {

  // Alternar modo edición 

  private modoEdicion:boolean=false;
  private subjectAlternarEdicion = new Subject<any>();


  constructor() { }

  alternarEdicion():void{
    this.modoEdicion=!this.modoEdicion;
    this.subjectAlternarEdicion.next(this.modoEdicion)
  }
  
  onAlternarEdicion():Observable<any>{
    return this.subjectAlternarEdicion.asObservable();
  }
 
}






