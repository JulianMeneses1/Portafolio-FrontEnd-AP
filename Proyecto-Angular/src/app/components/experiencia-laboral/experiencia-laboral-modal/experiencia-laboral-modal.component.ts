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

  urlPattern:string = "[-a-zA-Z0-9@:%_\\+.~#?&//=]{2,256}\\.[a-z]{2,4}\\b(\\/[-a-zA-Z0-9@:%_\\+.~#?&//=]*)?"
  fechaPattern:string = "(Enero|Marzo|Febrero|Mayo|Junio|Julio|Agosto|Septiembre|Octubre|Noviembre|Diciembre|Abril)\\s\\d{4}"

  @Output() modificarTitulo: EventEmitter <string> = new EventEmitter (); 

  @ViewChild('nuevoTitulo') nuevoTitulo!:ElementRef;
  @ViewChild('contenedorPrimerExp') contenedorPrimerExp!:ElementRef;
  @ViewChild('empresa') empresa!:ElementRef;  
  @ViewChild('puesto') puesto!:ElementRef;  
  @ViewChild('url') url!:ElementRef;  
  @ViewChild('fechaInicio') fechaInicio!:ElementRef;  
  @ViewChild('fechaFin') fechaFin!:ElementRef;  
  @ViewChild('descripcion') descripcion!:ElementRef;  

  constructor(private servicioEdicion : ModoEdicionService,
    private formBuilder: FormBuilder) 
  {    
    this.suscripcionAlternarEdicion = this.servicioEdicion.onAlternarEdicion().subscribe(
      value => this.modoEdicion = value)  
  }

  ngOnInit ():void {
    this.formularioExperiencia = this.formBuilder.group({
      empresa: ['',[Validators.required]],
      puesto: ['',[Validators.required]],
      url: ['',[Validators.pattern(this.urlPattern)]],
      fechaInicio: ['',[Validators.required,Validators.pattern(this.fechaPattern)]],
      fechaFin: ['',[Validators.required,Validators.pattern(this.fechaPattern)]],
      descripcion: ['',[Validators.required]]
    })
  }
  cambiarTitulo() {
    if (this.nuevoTitulo.nativeElement.value!=="") {
      this.titulo=this.nuevoTitulo.nativeElement.value;
      this.modificarTitulo.emit(this.titulo)
      this.nuevoTitulo.nativeElement.value=""
    }   
  }


  onSubmit ():void {
    if(this.formularioExperiencia.invalid) {
    this.formularioInvalido=true     
    } else {
    $("#experiencia-modal").modal('hide');      
    
    }
  }

  resetearTitulo () {                                                           
    $("#titulo-experiencia-modal").on('hidden.bs.modal',  () => {
      this.nuevoTitulo.nativeElement.value=""
      }
    ) 
  }
  
  resetearForm () {                                                           // para resetear el formulario cuando se hace click fuera del modal, 
                                                                              // o se apreta la tecla escape o se hace click en el botón cerrar
    $("#experiencia-modal").on('hidden.bs.modal',  () => {
      this.formularioExperiencia.reset();
      this.formularioInvalido = false             
      }
    ) 
  }

  ocultarMensajeError () {   
    this.formularioInvalido=false
  } 

}
