import { Component, ViewChild, ElementRef, OnInit, Renderer2} from '@angular/core';
import { faSquarePen, faPlus, faX } from '@fortawesome/free-solid-svg-icons';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { Experiencia } from 'src/app/interfaces/experiencia-laboral';
import { Experiencias } from 'src/app/interfaces/mosk-experiencia-laboral';
import { Router } from '@angular/router';

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
  suscripcion?:Subscription;
  posicion_Y:string="0px";
  experienciaSeleccionada:Experiencia=Experiencias[0];
  experiencias: Experiencia[] = Experiencias;
  mostrarPrimerExp:boolean = true

  @ViewChild('nuevoTitulo') nuevoTitulo!:ElementRef;
  @ViewChild('contenedorPrimerExp') contenedorPrimerExp!:ElementRef;
  @ViewChild('empresa') empresa!:ElementRef;  
  @ViewChild('puesto') puesto!:ElementRef;  
  @ViewChild('url') url!:ElementRef;  
  @ViewChild('fechaInicio') fechaInicio!:ElementRef;  
  @ViewChild('fechaFin') fechaFin!:ElementRef;  
  @ViewChild('descripcion') descripcion!:ElementRef;  

  constructor(private servicioEdicion : ModoEdicionService,
    private renderer: Renderer2, private ruta: Router) 
  {    
    this.suscripcion = this.servicioEdicion.onAlternar().subscribe(
      value => this.modoEdicion = value)
  }

  ngOnInit () {
    
  } 

  cambiarTitulo() {
    if (this.nuevoTitulo.nativeElement.value!=="") {
      this.titulo=this.nuevoTitulo.nativeElement.value;
      this.nuevoTitulo.nativeElement.value=""
    }   
  }
  
  resetearTitulo () {
    this.nuevoTitulo.nativeElement.value=""
  }

  onSelect (experiencia: Experiencia): void {
    this.experienciaSeleccionada = experiencia   
    this.posicion_Y=experiencia.posicionY            
  }
  desaparecerPrimerExp(){
    if (this.mostrarPrimerExp==true){
    this.renderer.setStyle(this.contenedorPrimerExp.nativeElement,"display", "none");
    this.mostrarPrimerExp=false
    }
  }
  resetearInputs() {

    this.empresa.nativeElement.value=""
    this.puesto.nativeElement.value=""
    this.descripcion.nativeElement.value=""
    this.fechaFin.nativeElement.value=""
    this.fechaInicio.nativeElement.value=""
    this.url.nativeElement.value=""

  }
  alternarExperiencias (): void {
    this.ruta.navigate(['experiencia'], {queryParams: {id:this.experienciaSeleccionada.id}})
  }
}







  
 

  
  
