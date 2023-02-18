import { Component, ViewChild, ElementRef, OnInit} from '@angular/core';
import { faSquarePen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { Experiencia } from 'src/app/interfaces/experiencia-laboral';
import { Experiencias } from 'src/app/interfaces/mosk-experiencia-laboral';


@Component({
  selector: 'app-experiencia-laboral',
  templateUrl: './experiencia-laboral.component.html',
  styleUrls: ['./experiencia-laboral.component.css']
})
export class ExperienciaLaboralComponent implements OnInit {

  titulo:string="Experiencia Laboral"
  faSquarePen = faSquarePen;
  faPlus = faPlus 
  modoEdicion:boolean=false;
  suscripcion?:Subscription;
  posicion:string="0px"

  @ViewChild('nuevoTitulo') nuevoTitulo!:ElementRef; 

  experienciaSeleccionada:Experiencia=Experiencias[0]
  experiencias: Experiencia[] = Experiencias

  constructor(private servicioEdicion : ModoEdicionService) 
  {
    this.suscripcion = this.servicioEdicion.onAlternar().subscribe(
      value => this.modoEdicion = value)
  }

  ngOnInit () {

  }

  cambiarTitulo(){
    if (this.nuevoTitulo.nativeElement.value!=="") {
      this.titulo=this.nuevoTitulo.nativeElement.value;
      this.nuevoTitulo.nativeElement.value=""
    }   
  } 

  onSelect (experiencia: Experiencia): void {
    this.experienciaSeleccionada = experiencia   
    this.posicion=experiencia.posicion    
  }
}






  
 

  
  
