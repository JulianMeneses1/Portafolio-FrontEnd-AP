import { Component, ViewChild, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;  

@Component({
  selector: 'app-experiencia-laboral-modal',
  templateUrl: './experiencia-laboral-modal.component.html',
  styleUrls: ['./experiencia-laboral-modal.component.css']
})
export class ExperienciaLaboralModalComponent implements OnInit {

  titulo:string="Experiencia Laboral"  
  modoEdicion:boolean=false;
  suscripcionAlternarEdicion?:Subscription;
  formularioExperiencia!: FormGroup;
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
    this.formularioExperiencia = this.formBuilder.group({
      titulo: [this.titulo,[Validators.required]]
    })
  }

  actualizarTitulo(){
      this.titulo=this.nuevoTitulo.nativeElement.value;
      this.modificarTitulo.emit(this.titulo)     
  }
  
  resetearForm () {                                                           // para resetear el formulario cuando se hace click fuera del modal, 
                                                                              // o se apreta la tecla escape o se hace click en el botón cerrar
    $("#experiencia-modal-titulo").on('hidden.bs.modal',  () => {
      this.formularioExperiencia.reset();
      this.formularioExperiencia.get('titulo')?.setValue(this.titulo);
      this.formularioInvalido = false  
      }
    ) 
  }

  onSubmit ():void {
    if(this.formularioExperiencia.invalid) {    
    this.formularioInvalido=true     
    } else {

    $("#experiencia-modal-titulo").modal('hide');
    this.formularioExperiencia.get('titulo')?.setValue(this.titulo);      
    }
  }

  ocultarMensajeError () {   
    this.formularioInvalido=false
  } 

}
