import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Formacion } from 'src/app/interfaces/formacion-academica';


@Component({
  selector: 'app-formacion-academica-modal-eliminar',
  templateUrl: './formacion-academica-modal-eliminar.component.html',
  styleUrls: ['./formacion-academica-modal-eliminar.component.css']
})
export class FormacionAcademicaModalEliminarComponent {


  @Input() formacion!: Formacion;
  @Output() enEliminarFormacion: EventEmitter <number> = new EventEmitter()

  eliminarFormacion () {
    this.enEliminarFormacion.emit(this.formacion.id)
  }

}
