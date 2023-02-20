import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Experiencia } from '../interfaces/experiencia-laboral';

@Injectable({
  providedIn: 'root'
})
export class ModoEdicionService {

  private Url = "http://localhost:4200"
  private modoEdicion:boolean=false;
  private subject = new Subject<any>()

  constructor() { }

  alternarEdicion():void{
    this.modoEdicion=!this.modoEdicion;
    this.subject.next(this.modoEdicion)
  }

  onAlternar():Observable<any>{
    return this.subject.asObservable();
  }
}






