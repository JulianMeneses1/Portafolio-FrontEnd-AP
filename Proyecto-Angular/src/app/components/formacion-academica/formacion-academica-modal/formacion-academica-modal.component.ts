import { Component, ViewChild, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;  

@Component({
  selector: 'app-formacion-academica-modal',
  templateUrl: './formacion-academica-modal.component.html',
  styleUrls: ['./formacion-academica-modal.component.css']
})
export class FormacionAcademicaModalComponent implements OnInit {

  titulo:string="Formación Académica"
  modoEdicion:boolean=false;
  suscripcionAlternarEdicion?:Subscription;
  formularioFormacion!: FormGroup;
  formularioInvalido: boolean = false;  


  @Output() modificarTitulo: EventEmitter <string> = new EventEmitter ();

  @ViewChild('nuevoTitulo') nuevoTitulo!:ElementRef;


  constructor(private servicioEdicion : ModoEdicionService,
    private formBuilder: FormBuilder) 
  {    
    this.suscripcionAlternarEdicion = this.servicioEdicion.onAlternarEdicion().subscribe(
      value => this.modoEdicion = value)     
  }

  ngOnInit ():void {
    this.formularioFormacion = this.formBuilder.group({
      titulo: [this.titulo,[Validators.required]]      
    })
  }

  cambiarTitulo(){
    this.titulo=this.nuevoTitulo.nativeElement.value;
    this.modificarTitulo.emit(this.titulo)     
}

resetearForm () {                                                           // para resetear el formulario cuando se hace click fuera del modal, 
                                                                            // o se apreta la tecla escape o se hace click en el botón cerrar
  $("#educacion-modal-titulo").on('hidden.bs.modal',  () => {
    this.formularioFormacion.reset();
    this.formularioFormacion.get('titulo')?.setValue(this.titulo);
    this.formularioInvalido = false  
    }
  ) 
}

onSubmit ():void {
  if(this.formularioFormacion.invalid) {    
  this.formularioInvalido=true     
  } else {
  this.cambiarTitulo();
  $("#educacion-modal-titulo").modal('hide');
  this.formularioFormacion.get('titulo')?.setValue(this.titulo);      
  }
}

ocultarMensajeError () {   
  this.formularioInvalido=false
} 
}
