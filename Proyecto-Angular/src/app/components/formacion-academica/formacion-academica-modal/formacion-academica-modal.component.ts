import { Component, ViewChild, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
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
  
  urlPattern:string = "[-a-zA-Z0-9@:%_\\+.~#?&//=]{2,256}\\.[a-z]{2,4}\\b(\\/[-a-zA-Z0-9@:%_\\+.~#?&//=]*)?"
  fechaPattern:string = "(Enero|Marzo|Febrero|Mayo|Junio|Julio|Agosto|Septiembre|Octubre|Noviembre|Diciembre|Abril)\\s\\d{4}"

  @Output() modificarTitulo: EventEmitter <string> = new EventEmitter ();

  @ViewChild('nuevoTitulo') nuevoTitulo!:ElementRef;
  @ViewChild('contenedorPrimerEducacion') contenedorPrimerEducacion!:ElementRef;
  @ViewChild('nombre') nombre!:ElementRef;  
  @ViewChild('institucion') institucion!:ElementRef;  
  @ViewChild('urlCertificado') urlCertificado!:ElementRef;  
  @ViewChild('urlInstitucion') urlInstitucion!:ElementRef;  
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
    this.formularioFormacion = this.formBuilder.group({
      nombre: ['',[Validators.required]],
      institucion: ['',[Validators.required]],
      urlInstitucion: ['',[Validators.required,Validators.pattern(this.urlPattern)]],
      urlCertificado: ['',[Validators.pattern(this.urlPattern)]],
      fechaInicio: ['',[Validators.required,Validators.pattern(this.fechaPattern)]],
      fechaFin: ['',[Validators.required,Validators.pattern(this.fechaPattern)]],
      descripcion: ['',[Validators.required]]
    })
  }

  cambiarTitulo() {
    if (this.nuevoTitulo.nativeElement.value!=="") {
      this.titulo=this.nuevoTitulo.nativeElement.value;
      this.modificarTitulo.emit(this.titulo);
      this.nuevoTitulo.nativeElement.value=""
    }   
  }
  
  resetearTitulo () {
    this.nuevoTitulo.nativeElement.value=""
  }
  
  resetearInputs() {

    this.nombre.nativeElement.value=""
    this.institucion.nativeElement.value=""
    this.descripcion.nativeElement.value=""
    this.fechaFin.nativeElement.value=""
    this.fechaInicio.nativeElement.value=""
    this.urlCertificado.nativeElement.value=""
    this.urlInstitucion.nativeElement.value="" 
    this.nuevoTitulo.nativeElement.value=""

  }

  onSubmit ():void {
    if(this.formularioFormacion.invalid) {
    this.formularioInvalido=true     
    } else {
    this.formularioFormacion.reset()    
    this.formularioInvalido=false
    }
  }

  toggleBtnFormacion () {
    this.formularioFormacion.reset()  
    this.formularioInvalido=false
  }

  ocultarMensajeError () {   
    this.formularioInvalido=false
  }   
}
