import { Component, OnInit} from '@angular/core';
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
  suscripcionAlternarEdicion?:Subscription;
  formacionAcademica: Educacion[] = FormacionAcademica  
  

  constructor(private servicioEdicion : ModoEdicionService) 
  {    
    this.suscripcionAlternarEdicion = this.servicioEdicion.onAlternarEdicion().subscribe(
      value => this.modoEdicion = value)
    }

  ngOnInit ():void {
 
  }

  cambiarTitulo (event:string) {
    this.titulo=event
  }
  
}







  
 

  
  
