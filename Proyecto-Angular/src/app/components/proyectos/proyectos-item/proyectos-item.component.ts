import { Component, Input, OnInit } from '@angular/core';
import { faX, faSquarePen } from '@fortawesome/free-solid-svg-icons';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { Proyecto } from 'src/app/interfaces/proyecto';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-proyectos-item',
  templateUrl: './proyectos-item.component.html',
  styleUrls: ['./proyectos-item.component.css']
})
export class ProyectosItemComponent  implements OnInit{
  faX = faX;
  faSquarePen = faSquarePen;
  faArrow = faArrowUpRightFromSquare 
  tecnologias !: string[];

  @Input() modoEdicion!:boolean;
  @Input() proyecto!: Proyecto;

  constructor() 
  { }

  ngOnInit () {
    this.tecnologias = this.proyecto.tecnologias.split(" ")

  }

}






  






