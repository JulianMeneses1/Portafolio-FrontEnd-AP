import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faSquarePen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { Conocimiento } from 'src/app/interfaces/conocimiento';
import { TituloSeccion } from 'src/app/interfaces/titulo-seccion';
import { TituloSeccionesService } from 'src/app/services/titulo-secciones.service';
import { ConocimientoService } from 'src/app/services/conocimiento.service';


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
  miTitulo!: TituloSeccion
  conocimientos!: Conocimiento[]

  constructor(private servicioEdicion : ModoEdicionService,
    private servicioTituloSeccion: TituloSeccionesService,
    private servicioConocimiento: ConocimientoService) 
  {
    this.suscripcionAlternarEdicion = this.servicioEdicion.onAlternarEdicion().subscribe(
      value => this.modoEdicion = value)
  }

   ngOnInit ():void {

    this.servicioTituloSeccion.obtenerTitulos().subscribe(data => {
      this.miTitulo=data[0];
    })
    this.servicioConocimiento.obtenerConocimientos().subscribe(data => {
      this.conocimientos=data
    })

  }   
  
  modificarTitulo(titulo:TituloSeccion){
    this.miTitulo=titulo
   
   }

   agregarConocimiento(conocimiento: Conocimiento) {
    this.servicioConocimiento.crearConocimiento(conocimiento).subscribe(() => {
      //this.conocimientos.push(conocimiento)    
      this.servicioConocimiento.obtenerConocimientos().subscribe(data => {
      this.conocimientos=data
      })
    })
   }

   eliminarConocimiento (id: number) {
    this.servicioConocimiento.eliminarConocimiento(id).subscribe(() => {
    this.conocimientos = this.conocimientos.filter( conoc => conoc.id !== id)
    })
  }
  modificarConocimiento (conocimiento: any) {
    
    this.servicioConocimiento.editarConocimiento(conocimiento).subscribe(() => {
      this.servicioConocimiento.obtenerConocimientos().subscribe(data => {
        this.conocimientos=data
        })
    })   

  }
 
}
