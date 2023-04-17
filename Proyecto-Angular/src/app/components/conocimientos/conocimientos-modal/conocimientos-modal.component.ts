import { Component, ViewChild, ElementRef, OnInit, Output, EventEmitter} from '@angular/core';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;    

@Component({
  selector: 'app-conocimientos-modal',
  templateUrl: './conocimientos-modal.component.html',
  styleUrls: ['./conocimientos-modal.component.css']
})
export class ConocimientosModalComponent implements OnInit {
  titulo:string="Conocimientos";
  modoEdicion:boolean=false;
  suscripcionAlternarEdicion?:Subscription;
  formularioConocimientos!: FormGroup;
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
    this.formularioConocimientos = this.formBuilder.group({
      titulo: [this.titulo,[Validators.required]]
    })
  }

  cambiarTitulo(){
      this.titulo=this.nuevoTitulo.nativeElement.value;
      this.modificarTitulo.emit(this.titulo)     
  }
  
  resetearForm () {                                                           // para resetear el formulario cuando se hace click fuera del modal, 
                                                                              // o se apreta la tecla escape o se hace click en el botón cerrar
    $("#conocimiento-modal-titulo").on('hidden.bs.modal',  () => {
      this.formularioConocimientos.reset();
      this.formularioConocimientos.get('titulo')?.setValue(this.titulo);
      this.formularioInvalido = false  
      }
    ) 
  }

  onSubmit ():void {
    if(this.formularioConocimientos.invalid) {    
    this.formularioInvalido=true     
    } else {
    this.cambiarTitulo();
    $("#conocimiento-modal-titulo").modal('hide');
    this.formularioConocimientos.get('titulo')?.setValue(this.titulo);      
    }
  }

  ocultarMensajeError () {   
    this.formularioInvalido=false
  }    

}






