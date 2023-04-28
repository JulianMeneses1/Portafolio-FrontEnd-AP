import { Component, ViewChild, ElementRef, OnInit, Renderer2, Output, EventEmitter} from '@angular/core';
import { faSquarePen, faPlus, faX } from '@fortawesome/free-solid-svg-icons';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { Experiencia } from 'src/app/interfaces/experiencia-laboral';
import { Router } from '@angular/router';
import { ExpLaboralService } from 'src/app/services/exp-laboral.service';
import { TituloSeccionesService } from 'src/app/services/titulo-secciones.service';
import { TituloSeccion } from 'src/app/interfaces/titulo-seccion';

@Component({
  selector: 'app-experiencia-laboral',
  templateUrl: './experiencia-laboral.component.html',
  styleUrls: ['./experiencia-laboral.component.css']
})
export class ExperienciaLaboralComponent implements OnInit {

  titulo:string="Experiencia Laboral"
  faSquarePen = faSquarePen;
  faPlus = faPlus;
  faX = faX;   
  modoEdicion:boolean=false;
  suscripcionAlternarEdicion?:Subscription;
  posicion_Y:string="0px";  
  experiencias!: Experiencia[]
  experienciaSeleccionada!:Experiencia
  mostrarPrimerExp:boolean = true;
  miTitulo!: TituloSeccion  

  @Output() enModificarExperienciaHijo: EventEmitter <Experiencia> = new EventEmitter ()
  @ViewChild('contenedorPrimerExp') contenedorPrimerExp!:ElementRef;  


  constructor(private servicioEdicion : ModoEdicionService,
     private ruta: Router,
     private servicioExperiencia : ExpLaboralService,
     private servicioTituloSeccion: TituloSeccionesService,
     private renderer : Renderer2)
      
  {    
    this.suscripcionAlternarEdicion = this.servicioEdicion.onAlternarEdicion().subscribe(
      value => this.modoEdicion = value)
  }

  ngOnInit ():void {
    this.servicioTituloSeccion.obtenerTitulos().subscribe(data => {
      this.miTitulo=data[1];
    })
    this.servicioExperiencia.obtenerExperiencias().subscribe(data => {
      this.experiencias=data
      this.experienciaSeleccionada = data[0]
    })

  }

  modificarTitulo(titulo:TituloSeccion){
    this.miTitulo=titulo
   
   }

  desaparecerPrimerExp(){
    if (this.mostrarPrimerExp==true){
    this.renderer.setStyle(this.contenedorPrimerExp.nativeElement,"display", "none");
    this.mostrarPrimerExp=false
    }
  } 
  
  onSelect (experiencia: Experiencia): void {
    this.experienciaSeleccionada = experiencia; 
    this.posicion_Y=experiencia.posicion_Y;      
  }
 
  
  alternarExperiencias (): void {
    this.ruta.navigate(['/experiencia'], {queryParams: {idExp:this.experienciaSeleccionada.id}})
  }

  agregarExperiencia(experiencia: Experiencia) {
    this.servicioExperiencia.crearExperiencia(experiencia).subscribe(() => {
      //this.experiencias.push(experiencia)    
      this.servicioExperiencia.obtenerExperiencias().subscribe(data => {
      this.experiencias=data
      })
    })
   }

   eliminarExperiencia (id: number) {
    this.servicioExperiencia.eliminarExperiencia(id).subscribe(() => {
    this.experiencias = this.experiencias.filter( conoc => conoc.id !== id)
    })
  }
  modificarExperiencia (experiencia: any) {
    
    this.servicioExperiencia.editarExperiencia(experiencia).subscribe(() => {
      this.servicioExperiencia.obtenerExperiencias().subscribe(data => {
        this.experiencias=data
        })
    })  
 
  }
}









  
 

  
  
