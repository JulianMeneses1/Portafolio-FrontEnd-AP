import { Component, ViewChild, ElementRef, OnInit, Output, EventEmitter} from '@angular/core';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;    

@Component({
  selector: 'app-proyectos-modal',
  templateUrl: './proyectos-modal.component.html',
  styleUrls: ['./proyectos-modal.component.css']
})
export class ProyectosModalComponent implements OnInit {
  titulo:string="Proyectos";
  modoEdicion:boolean=false;
  suscripcionAlternarEdicion?:Subscription;
  formularioProyecto!: FormGroup;
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
    this.formularioProyecto = this.formBuilder.group({
      titulo: [this.titulo,[Validators.required]]
    })
  }

  cambiarTitulo(){
      this.titulo=this.nuevoTitulo.nativeElement.value;
      this.modificarTitulo.emit(this.titulo)     
  }
  
  resetearForm () {                                                           // para resetear el formulario cuando se hace click fuera del modal, 
                                                                              // o se apreta la tecla escape o se hace click en el botón cerrar
    $("#proyecto-modal-titulo").on('hidden.bs.modal',  () => {
      this.formularioProyecto.reset();
      this.formularioProyecto.get('titulo')?.setValue(this.titulo);
      this.formularioInvalido = false  
      }
    ) 
  }

  onSubmit ():void {
    if(this.formularioProyecto.invalid) {    
    this.formularioInvalido=true     
    } else {
    this.cambiarTitulo();
    $("#proyecto-modal-titulo").modal('hide');
    this.formularioProyecto.get('titulo')?.setValue(this.titulo);      
    }
  }

  ocultarMensajeError () {   
    this.formularioInvalido=false
  } 

}