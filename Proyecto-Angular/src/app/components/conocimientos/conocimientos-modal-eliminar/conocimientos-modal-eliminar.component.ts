import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Conocimiento } from 'src/app/interfaces/conocimiento';

@Component({
  selector: 'app-conocimientos-modal-eliminar',
  templateUrl: './conocimientos-modal-eliminar.component.html',
  styleUrls: ['./conocimientos-modal-eliminar.component.css']
})
export class ConocimientosModalEliminarComponent {


  @Input() conocimiento!: Conocimiento; 
  @Output() enEliminarConocimiento: EventEmitter <number> = new EventEmitter ()


  eliminarConocimiento () {
    this.enEliminarConocimiento.emit(this.conocimiento.id)
  }

}
