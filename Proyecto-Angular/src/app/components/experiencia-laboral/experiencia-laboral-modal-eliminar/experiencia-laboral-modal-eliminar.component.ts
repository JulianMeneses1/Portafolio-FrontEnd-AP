import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Experiencia } from 'src/app/interfaces/experiencia-laboral';

@Component({
  selector: 'app-experiencia-laboral-modal-eliminar',
  templateUrl: './experiencia-laboral-modal-eliminar.component.html',
  styleUrls: ['./experiencia-laboral-modal-eliminar.component.css']
})
export class ExperienciaLaboralModalEliminarComponent {

  @Input() experiencia!: Experiencia; 
  @Output() enEliminarExperiencia: EventEmitter <number> = new EventEmitter ()


  eliminarExperiencia () {
    this.enEliminarExperiencia.emit(this.experiencia.id)
  }

}
