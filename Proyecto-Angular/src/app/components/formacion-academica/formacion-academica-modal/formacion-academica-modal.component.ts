import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TituloSeccion } from 'src/app/interfaces/titulo-seccion';
import { TituloSeccionesService } from 'src/app/services/titulo-secciones.service';
declare var $: any;  

@Component({
  selector: 'app-formacion-academica-modal',
  templateUrl: './formacion-academica-modal.component.html',
  styleUrls: ['./formacion-academica-modal.component.css']
})
export class FormacionAcademicaModalComponent implements OnInit {

  formularioFormacion!: FormGroup;
  formularioInvalido: boolean = false; 
  miTitulo!: TituloSeccion;

  @Output() actualizarTitulo: EventEmitter <any> = new EventEmitter ();


  constructor(private formBuilder: FormBuilder,
    private servicioTituloSeccion: TituloSeccionesService) 
  { }

  ngOnInit ():void {
    this.servicioTituloSeccion.obtenerTitulos().subscribe(data => {
      this.miTitulo=data[3];
      this.formularioFormacion = this.formBuilder.group({
        id: [''],
        titulo: ['',[Validators.required]]
      })
      this.formularioFormacion.patchValue(this.miTitulo)

    })
  }

  resetearForm () {                                                           // para resetear el formulario cuando se hace click fuera del modal, 
                                                                            // o se apreta la tecla escape o se hace click en el botón cerrar
    $("#formacion-modal-titulo").on('hidden.bs.modal',  () => {
        this.formularioFormacion.patchValue(this.miTitulo)
        this.formularioInvalido = false  
      }
    ) 
  }

  onSubmit ():void {
    if(this.formularioFormacion.invalid) {    
    this.formularioInvalido=true     
    } else {
      this.miTitulo = this.formularioFormacion.value;
      this.servicioTituloSeccion.editarTitulo(this.formularioFormacion.value).subscribe();
      this.actualizarTitulo.emit(this.miTitulo)
      $("#formacion-modal-titulo").modal('hide')    
    }
  }

  ocultarMensajeError () {   
    this.formularioInvalido=false
  }  
}
