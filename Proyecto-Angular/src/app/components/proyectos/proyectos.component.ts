import { Component, OnInit} from '@angular/core';
import { faSquarePen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { Proyecto } from 'src/app/interfaces/proyecto';
import { TituloSeccion } from 'src/app/interfaces/titulo-seccion';
import { TituloSeccionesService } from 'src/app/services/titulo-secciones.service';
import { ProyectoService } from 'src/app/services/proyecto.service';


@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  titulo!:TituloSeccion
  faSquarePen = faSquarePen;
  faPlus = faPlus 
  modoEdicion:boolean=false;
  suscripcionAlternarEdicion?:Subscription;
  proyectos !: Proyecto[]



  constructor(private servicioEdicion : ModoEdicionService,
              private servicioTituloSeccion: TituloSeccionesService,
              private servicioProyecto: ProyectoService) 
  {
    this.suscripcionAlternarEdicion = this.servicioEdicion.onAlternarEdicion().subscribe(
      value => this.modoEdicion = value)     
  }

  ngOnInit ():void {
    this.servicioTituloSeccion.obtenerTitulos().subscribe(data => {
      this.titulo=data[2];
    })
    this.servicioProyecto.obtenerProyectos().subscribe(data => {
      this.proyectos=data
    })
   
  }

  modificarTitulo(titulo:TituloSeccion) {
    this.titulo=titulo
  }

  agregarProyecto(proyecto: Proyecto) {
    this.servicioProyecto.crearProyecto(proyecto).subscribe(() => {
      //this.proyectos.push(proyecto)    
      this.servicioProyecto.obtenerProyectos().subscribe(data => {
      this.proyectos=data;
      })
    })
   }

   eliminarProyecto (id: number) {
    this.servicioProyecto.eliminarProyecto(id).subscribe(() => {
    this.proyectos = this.proyectos.filter( conoc => conoc.id !== id)
    })
  }

  modificarProyecto (proyecto: any) {    
    this.servicioProyecto.editarProyecto(proyecto).subscribe(() => {
      this.servicioProyecto.obtenerProyectos().subscribe(data => {
        this.proyectos=data
        })
    })   

  }
  
}
