import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;    

@Component({
  selector: 'app-acerca-de-mi-modal',
  templateUrl: './acerca-de-mi-modal.component.html',
  styleUrls: ['./acerca-de-mi-modal.component.css']
})
export class AcercaDeMiModalComponent implements OnInit {
  modoEdicion:boolean=false;
  suscripcionAlternarEdicion?:Subscription;
  formularioInvalido: boolean = false; 
  formularioAcercaDeMi!: FormGroup;
  titulo:string="Sobre mí";
  texto:string="Hola! Soy Julián, full-stack web developer. Empecé a incursionar en el mundo de la programación de forma autodidácta a partir de videos en YouTube, por allá a finales de 2021,\
                y actualmente estoy estudiando la carrera de Desarrollo Web y Aplicaciones Digitales. Me apasiona el diseño y desarrollo de sitios y aplicaciones web dinámicos y creativos.\
                Estoy en búsqueda de nuevos desafíos laborales que pongan a prueba mis conocimientos, y me permitan tanto seguir aprendiendo como seguir creciendo profesionalmente."
   
  @Output() modificarTitulo: EventEmitter <string> = new EventEmitter ();
  @Output() modificarTexto: EventEmitter <string> = new EventEmitter (); 
                
  @ViewChild('nuevoTitulo') nuevoTitulo!:ElementRef; 
  @ViewChild('nuevoTexto') nuevoTexto!:ElementRef;   

  constructor(private servicioEdicion : ModoEdicionService,
          private formBuilder: FormBuilder) 
  {
    this.suscripcionAlternarEdicion = this.servicioEdicion.onAlternarEdicion().subscribe(
      value => this.modoEdicion = value)
  }

  ngOnInit(): void {   
    this.formularioAcercaDeMi = this.formBuilder.group({
      titulo: [this.titulo,[Validators.required]],
      texto: [this.texto,[Validators.required]]
    })
  }
  cambiarTexto(){
    if (this.nuevoTitulo.nativeElement.value!=="") {
      this.titulo=this.nuevoTitulo.nativeElement.value;
      this.modificarTitulo.emit(this.titulo);
    }
    if (this.nuevoTexto.nativeElement.value!=="") {
      this.texto=this.nuevoTexto.nativeElement.value;
      this.modificarTexto.emit(this.texto);   
      } 
  }

  resetearForm () {                                                           // para resetear el formulario cuando se hace click fuera del modal, 
                                                                              // o se apreta la tecla escape o se hace click en el botón cerrar
    $("#acerca-de-mi-modal").on('hidden.bs.modal',  () => {
      this.formularioAcercaDeMi.reset();
      this.formularioAcercaDeMi.get('titulo')?.setValue(this.titulo);
      this.formularioAcercaDeMi.get('texto')?.setValue(this.texto);
      this.formularioInvalido = false;    
      }
    ) 
  }

  onSubmit ():void {
    if(this.formularioAcercaDeMi.invalid) {
      this.formularioInvalido=true 
      console.log("hola")  
    } else {
    this.cambiarTexto();
    $("#acerca-de-mi-modal").modal('hide');
    this.formularioAcercaDeMi.get('titulo')?.setValue(this.titulo);
    this.formularioAcercaDeMi.get('texto')?.setValue(this.texto);
    }
  } 

  ocultarMensajeError () {   
    this.formularioInvalido=false
  }  
}
