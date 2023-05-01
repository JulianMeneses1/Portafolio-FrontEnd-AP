import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TituloSeccionesService } from 'src/app/services/titulo-secciones.service';
import { TituloSeccion } from 'src/app/interfaces/titulo-seccion';
declare var $: any;  

@Component({
  selector: 'app-experiencia-laboral-modal',
  templateUrl: './experiencia-laboral-modal.component.html',
  styleUrls: ['./experiencia-laboral-modal.component.css']
})
export class ExperienciaLaboralModalComponent implements OnInit { 

  formularioExperiencia!: FormGroup;
  formularioInvalido: boolean = false; 
  miTitulo!: TituloSeccion 

  @Output() actualizarTitulo: EventEmitter <any> = new EventEmitter (); 


  constructor(private formBuilder: FormBuilder,
    private servicioTituloSeccion: TituloSeccionesService) 
    { }

  ngOnInit ():void {
    this.servicioTituloSeccion.obtenerTitulos().subscribe(data => {
      this.miTitulo=data[1];
      this.formularioExperiencia = this.formBuilder.group({
        id: [''],
        titulo: [this.miTitulo.titulo,[Validators.required]]
      })
      this.formularioExperiencia.patchValue(this.miTitulo)

    })
  }
  
  resetearForm () {                                                           // para resetear el formulario cuando se hace click fuera del modal, 
                                                                              // o se apreta la tecla escape o se hace click en el botón cerrar
    $("#experiencia-modal-titulo").on('hidden.bs.modal',  () => {
      this.formularioExperiencia.patchValue(this.miTitulo) 
      this.formularioInvalido = false  
      }
    ) 
  }

  onSubmit ():void {
    if(this.formularioExperiencia.invalid) { 

    this.formularioInvalido=true     
    } else {
      this.miTitulo = this.formularioExperiencia.value;
      this.servicioTituloSeccion.editarTitulo(this.formularioExperiencia.value).subscribe();    
      this.actualizarTitulo.emit(this.miTitulo)
    $("#experiencia-modal-titulo").modal('hide');    
    }
  }

  ocultarMensajeError () {   
    this.formularioInvalido=false
  } 

}
