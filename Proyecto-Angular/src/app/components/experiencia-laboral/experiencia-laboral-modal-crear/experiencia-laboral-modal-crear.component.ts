import { Component, ViewChild, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;  

@Component({
  selector: 'app-experiencia-laboral-modal-crear',
  templateUrl: './experiencia-laboral-modal-crear.component.html',
  styleUrls: ['./experiencia-laboral-modal-crear.component.css']
})
export class ExperienciaLaboralModalCrearComponent implements OnInit {

  titulo:string="Experiencia Laboral"  
  modoEdicion:boolean=false;
  suscripcionAlternarEdicion?:Subscription;
  formularioExperiencia!: FormGroup;
  formularioInvalido: boolean = false;  

  urlPattern:string = "[-a-zA-Z0-9@:%_\\+.~#?&//=]{2,256}\\.[a-z]{2,4}\\b(\\/[-a-zA-Z0-9@:%_\\+.~#?&//=]*)?"
  fechaPattern:string = "((Enero|Marzo|Febrero|Mayo|Junio|Julio|Agosto|Septiembre|Octubre|Noviembre|Diciembre|Abril)\\s\\d{4})|Actualidad"

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

  onSubmit ():void {
    if(this.formularioExperiencia.invalid) {
    this.formularioInvalido=true     
    } else {
    $("#experiencia-modal").modal('hide');      
    
    }
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
