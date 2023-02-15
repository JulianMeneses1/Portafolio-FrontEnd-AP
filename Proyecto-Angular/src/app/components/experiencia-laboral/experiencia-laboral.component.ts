import { Component, ViewChild, ElementRef} from '@angular/core';
import { faSquarePen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { Experiencia } from 'src/app/interfaces/experiencia-laboral';
import { Experiencias } from 'src/app/interfaces/mosk-experiencia-laboral';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-experiencia-laboral',
  templateUrl: './experiencia-laboral.component.html',
  styleUrls: ['./experiencia-laboral.component.css']
})
export class ExperienciaLaboralComponent {

  titulo:string="Experiencia Laboral"
  faSquarePen = faSquarePen;
  faPlus = faPlus 
  modoEdicion:boolean=false;
  suscripcion?:Subscription; 

  @ViewChild('nuevoTitulo') nuevoTitulo!:ElementRef; 

  experiencias: Experiencia[] = Experiencias

  constructor(private servicioEdicion : ModoEdicionService,
    private sanitizer: DomSanitizer) 
  {
    this.suscripcion = this.servicioEdicion.onAlternar().subscribe(
      value => this.modoEdicion = value)
  }

  cambiarTitulo(){
    if (this.nuevoTitulo.nativeElement.value!=="") {
      this.titulo=this.nuevoTitulo.nativeElement.value;
      this.nuevoTitulo.nativeElement.value=""
    }   
  }  

}






  
 

  
  
