import { Component, OnInit} from '@angular/core';
import { faSquarePen, faPlus, faX } from '@fortawesome/free-solid-svg-icons';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { Formacion } from 'src/app/interfaces/formacion-academica';
import { TituloSeccionesService } from 'src/app/services/titulo-secciones.service';
import { FormAcademicaService } from 'src/app/services/form-academica.service';
import { TituloSeccion } from 'src/app/interfaces/titulo-seccion';


@Component({
  selector: 'app-formacion-academica',
  templateUrl: './formacion-academica.component.html',
  styleUrls: ['./formacion-academica.component.css']
})
export class FormacionAcademicaComponent implements OnInit {

  faSquarePen = faSquarePen;
  faPlus = faPlus;
  faX = faX;   
  modoEdicion:boolean=false;
  suscripcionAlternarEdicion?:Subscription;
  formaciones!: Formacion[]
  titulo!: TituloSeccion 
  

  constructor(private servicioEdicion : ModoEdicionService,
            private servicioTituloSeccion: TituloSeccionesService,
            private servicioFormacionAcademica: FormAcademicaService) 
  {    
    this.suscripcionAlternarEdicion = this.servicioEdicion.onAlternarEdicion().subscribe(
      value => this.modoEdicion = value)
    }

  ngOnInit ():void {

    this.servicioTituloSeccion.obtenerTitulos().subscribe(data => {
      this.titulo=data[3];
    })
    this.servicioFormacionAcademica.obtenerFormaciones().subscribe(data => {
      this.formaciones=data
    })
 
  }

 
  modificarTitulo(titulo:TituloSeccion) {
    this.titulo=titulo
  }

  agregarFormacion(formacion: Formacion) {
    this.servicioFormacionAcademica.crearFormacion(formacion).subscribe((form) => {
      this.formaciones.push(form);
    })
   }

   eliminarFormacion (id: number) {
    this.servicioFormacionAcademica.eliminarFormacion(id).subscribe(() => {
    this.formaciones = this.formaciones.filter( conoc => conoc.id !== id)
    })
  }

  modificarFormacion (formacion: any) {    
    this.servicioFormacionAcademica.editarFormacion(formacion).subscribe(() => {
      let expModificada: any = this.formaciones.find(forma => forma.id == formacion.id);
      this.formaciones[this.formaciones.indexOf(expModificada)]=formacion      
    
    })   

  }
  
}







  
 

  
  
