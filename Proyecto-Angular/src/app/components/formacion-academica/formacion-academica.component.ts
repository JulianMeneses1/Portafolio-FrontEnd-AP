import { Component, ViewChild, ElementRef, OnInit, Renderer2} from '@angular/core';
import { faSquarePen, faPlus, faX } from '@fortawesome/free-solid-svg-icons';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { Educacion } from 'src/app/interfaces/formacion-academica';
import { FormacionAcademica } from 'src/app/interfaces/mosk-formacion-academica';

@Component({
  selector: 'app-formacion-academica',
  templateUrl: './formacion-academica.component.html',
  styleUrls: ['./formacion-academica.component.css']
})
export class FormacionAcademicaComponent implements OnInit {

  titulo:string="Formación Académica"
  faSquarePen = faSquarePen;
  faPlus = faPlus;
  faX = faX;   
  modoEdicion:boolean=false;
  suscripcion?:Subscription; 
  formacionAcademica: Educacion[] = FormacionAcademica;
  

  @ViewChild('nuevoTitulo') nuevoTitulo!:ElementRef;
  @ViewChild('contenedorPrimerEducacion') contenedorPrimerEducacion!:ElementRef;
  @ViewChild('nombre') nombre!:ElementRef;  
  @ViewChild('institucion') institucion!:ElementRef;  
  @ViewChild('urlCertificado') urlCertificado!:ElementRef;  
  @ViewChild('urlInstitucion') urlInstitucion!:ElementRef;  
  @ViewChild('fechaInicio') fechaInicio!:ElementRef;  
  @ViewChild('fechaFin') fechaFin!:ElementRef;  
  @ViewChild('descripcion') descripcion!:ElementRef;  

  constructor(private servicioEdicion : ModoEdicionService) 
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
  
  resetearInputs() {

    this.nombre.nativeElement.value=""
    this.institucion.nativeElement.value=""
    this.descripcion.nativeElement.value=""
    this.fechaFin.nativeElement.value=""
    this.fechaInicio.nativeElement.value=""
    this.urlCertificado.nativeElement.value=""
    this.urlInstitucion.nativeElement.value="" 

  }  
}







  
 

  
  
