import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TituloSeccionesService } from 'src/app/services/titulo-secciones.service';
import { TituloSeccion } from 'src/app/interfaces/titulo-seccion';
declare var $: any;

@Component({
  selector: 'app-contacto-modal',
  templateUrl: './contacto-modal.component.html',
  styleUrls: ['./contacto-modal.component.css']
})

export class ContactoModalComponent implements OnInit{
 
  formularioContacto!: FormGroup;
  formularioInvalido: boolean = false;
  titulo !: TituloSeccion

  @Output() actualizarTitulo: EventEmitter <TituloSeccion> = new EventEmitter ();

  constructor(private formBuilder: FormBuilder, 
              private servicioTituloSeccion : TituloSeccionesService) 
  { }

  ngOnInit ():void {
    this.servicioTituloSeccion.obtenerTitulos().subscribe(data => {
      this.titulo=data[4];
      this.formularioContacto = this.formBuilder.group({
        id: [''],
        titulo: ['',[Validators.required]]
      })
      this.formularioContacto.patchValue(this.titulo)

    })
  }

  resetearForm () {                                                           // para resetear el formulario cuando se hace click fuera del modal, 
                                                                              // o se apreta la tecla escape o se hace click en el botón cerrar
    $("#contacto-modal-titulo").on('hidden.bs.modal',  () => {
      this.formularioContacto.patchValue(this.titulo)
      this.formularioInvalido = false  
      }
    ) 
  }

  onSubmit ():void {
    if(this.formularioContacto.invalid) {    
    this.formularioInvalido=true     
    } else {
      this.titulo = this.formularioContacto.value;
      this.servicioTituloSeccion.editarTitulo(this.formularioContacto.value).subscribe();
      this.actualizarTitulo.emit(this.titulo)
    $("#contacto-modal-titulo").modal('hide');  
    }
  }

  ocultarMensajeError () {   
    this.formularioInvalido=false
  } 
  }
