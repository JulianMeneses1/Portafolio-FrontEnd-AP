import { Component, OnInit} from '@angular/core';
import { faSquarePen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { Proyecto } from 'src/app/interfaces/proyecto';
import { Proyectos } from 'src/app/interfaces/mosk-proyecto';


@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  titulo:string="Proyectos";
  faSquarePen = faSquarePen;
  faPlus = faPlus 
  modoEdicion:boolean=false;
  suscripcionAlternarEdicion?:Subscription;

  proyectos: Proyecto[] = Proyectos

  constructor(private servicioEdicion : ModoEdicionService) 
  {
    this.suscripcionAlternarEdicion = this.servicioEdicion.onAlternarEdicion().subscribe(
      value => this.modoEdicion = value)     
  }

  ngOnInit ():void {
   
  }

  cambiarTitulo(event:string) {
    this.titulo=event
  }
  
}
