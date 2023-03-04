import { Component, Input } from '@angular/core';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { Proyectos } from 'src/app/interfaces/mosk-proyecto';
import { Proyecto } from 'src/app/interfaces/proyecto';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-proyectos-item',
  templateUrl: './proyectos-item.component.html',
  styleUrls: ['./proyectos-item.component.css']
})
export class ProyectosItemComponent  {
  faX = faX;
  faArrow = faArrowUpRightFromSquare
  modoEdicion:boolean=false;
  suscripcion?:Subscription;
  @Input() proyecto: Proyecto = Proyectos[0];


  constructor(private servicioEdicion : ModoEdicionService) 
  {
    this.suscripcion = this.servicioEdicion.onAlternar().subscribe(
      value => this.modoEdicion = value)
  }

}






  






