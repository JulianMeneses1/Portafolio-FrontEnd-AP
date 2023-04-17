import { Component, ViewChild, ElementRef, OnInit, Output, EventEmitter} from '@angular/core';
import { faSquarePen, faUser, faEnvelope, faFileLines } from '@fortawesome/free-solid-svg-icons';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-contacto-modal',
  templateUrl: './contacto-modal.component.html',
  styleUrls: ['./contacto-modal.component.css']
})


export class ContactoModalComponent implements OnInit{


  titulo:string = "¡Espero tu mensaje!"; 
  modoEdicion:boolean=false;
  suscripcionAlternarEdicion?:Subscription;
  formularioContacto!: FormGroup;
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
    
    this.formularioContacto = this.formBuilder.group({
      titulo: [this.titulo,[Validators.required]]
    })
  }

  cambiarTitulo(){
    this.titulo=this.nuevoTitulo.nativeElement.value;
    this.modificarTitulo.emit(this.titulo)     
  }

  resetearForm () {                                                           // para resetear el formulario cuando se hace click fuera del modal, 
                                                                              // o se apreta la tecla escape o se hace click en el botón cerrar
    $("#contacto-modal-titulo").on('hidden.bs.modal',  () => {
      this.formularioContacto.reset();
      this.formularioContacto.get('titulo')?.setValue(this.titulo);
      this.formularioInvalido = false  
      }
    ) 
  }

  onSubmit ():void {
    if(this.formularioContacto.invalid) {    
    this.formularioInvalido=true     
    } else {
    this.cambiarTitulo();
    $("#contacto-modal-titulo").modal('hide');
    this.formularioContacto.get('titulo')?.setValue(this.titulo);      
    }
  }

  ocultarMensajeError () {   
    this.formularioInvalido=false
  } 
  }
