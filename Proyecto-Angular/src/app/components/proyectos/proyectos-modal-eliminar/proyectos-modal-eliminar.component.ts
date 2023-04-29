import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Proyecto } from 'src/app/interfaces/proyecto';



@Component({
  selector: 'app-proyectos-modal-eliminar',
  templateUrl: './proyectos-modal-eliminar.component.html',
  styleUrls: ['./proyectos-modal-eliminar.component.css']
})
export class ProyectosModalEliminarComponent {

  @Input() proyecto!: Proyecto;
  @Output() enEliminarProyecto: EventEmitter <number> = new EventEmitter()

  eliminarProyecto () {
    this.enEliminarProyecto.emit(this.proyecto.id)
  }

}



