import { Component, OnInit } from '@angular/core';
import { faSquarePen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { Conocimiento } from 'src/app/interfaces/conocimiento';
import { Conocimientos } from 'src/app/interfaces/mosk-conocimientos';


@Component({
  selector: 'app-conocimientos',
  templateUrl: './conocimientos.component.html',
  styleUrls: ['./conocimientos.component.css']
})
export class ConocimientosComponent implements OnInit{
  titulo:string="Conocimientos"
  faSquarePen = faSquarePen;
  faPlus = faPlus 
  modoEdicion:boolean=false;
  suscripcionAlternarEdicion?:Subscription

  conocimientos: Conocimiento[] = Conocimientos

  constructor(private servicioEdicion : ModoEdicionService) 
  {
    this.suscripcionAlternarEdicion = this.servicioEdicion.onAlternarEdicion().subscribe(
      value => this.modoEdicion = value)
  }

  cambiarTitulo(event:string){
   this.titulo=event
  
  }

  ngOnInit ():void {

  }  
}
