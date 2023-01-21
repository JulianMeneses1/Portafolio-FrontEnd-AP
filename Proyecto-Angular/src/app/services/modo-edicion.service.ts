import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModoEdicionService {

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








//   onToggle():Observable<any>{
//     return this.subject.asObservable();
//   }
// }
