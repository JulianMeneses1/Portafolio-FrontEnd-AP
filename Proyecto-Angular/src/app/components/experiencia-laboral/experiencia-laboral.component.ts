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
  suscripcionAlternarEdicion?:Subscription;
  posicion_Y:string="0px";
  experienciaSeleccionada:Experiencia=Experiencias[0];
  experiencias: Experiencia[] = Experiencias;
  mostrarPrimerExp:boolean = true;  


  @ViewChild('contenedorPrimerExp') contenedorPrimerExp!:ElementRef;


  constructor(private servicioEdicion : ModoEdicionService,
    private renderer: Renderer2, private ruta: Router) 
  {    
    this.suscripcionAlternarEdicion = this.servicioEdicion.onAlternar().subscribe(
      value => this.modoEdicion = value)
  }

  ngOnInit ():void {

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
  
  alternarExperiencias (): void {
    this.ruta.navigate(['/experiencia'], {queryParams: {idExp:this.experienciaSeleccionada.id}})
  }
}







  
 

  
  
