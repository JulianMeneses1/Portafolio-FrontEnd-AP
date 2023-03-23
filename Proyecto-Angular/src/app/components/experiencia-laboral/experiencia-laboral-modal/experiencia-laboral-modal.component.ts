import { Component, ViewChild, ElementRef, OnInit, Renderer2} from '@angular/core';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-experiencia-laboral-modal',
  templateUrl: './experiencia-laboral-modal.component.html',
  styleUrls: ['./experiencia-laboral-modal.component.css']
})
export class ExperienciaLaboralModalComponent implements OnInit {

  titulo:string="Experiencia Laboral"  
  modoEdicion:boolean=false;
  suscripcionAlternarEdicion?:Subscription;
  suscripcionBtnAceptar?:Subscription;
  formularioExperiencia!: FormGroup;
  formularioInvalido: boolean = false;
  habilitarBotonExperiencia:boolean = true

  urlPattern:string = "[-a-zA-Z0-9@:%_\\+.~#?&//=]{2,256}\\.[a-z]{2,4}\\b(\\/[-a-zA-Z0-9@:%_\\+.~#?&//=]*)?"
  fechaPattern:string = "(Enero|Marzo|Febrero|Mayo|Junio|Julio|Agosto|Septiembre|Octubre|Noviembre|Diciembre|Abril)\\s\\d{4}"

  @ViewChild('nuevoTitulo') nuevoTitulo!:ElementRef;
  @ViewChild('contenedorPrimerExp') contenedorPrimerExp!:ElementRef;
  @ViewChild('empresa') empresa!:ElementRef;  
  @ViewChild('puesto') puesto!:ElementRef;  
  @ViewChild('url') url!:ElementRef;  
  @ViewChild('fechaInicio') fechaInicio!:ElementRef;  
  @ViewChild('fechaFin') fechaFin!:ElementRef;  
  @ViewChild('descripcion') descripcion!:ElementRef;  

  constructor(private servicioEdicion : ModoEdicionService,
    private renderer: Renderer2, private ruta: Router,
    private formBuilder: FormBuilder) 
  {    
    this.suscripcionAlternarEdicion = this.servicioEdicion.onAlternar().subscribe(
      value => this.modoEdicion = value);
      this.suscripcionBtnAceptar = this.servicioEdicion.onAlternarFormConocimientos().subscribe(
        value => this.habilitarBotonExperiencia = value)
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
      this.nuevoTitulo.nativeElement.value=""
    }   
  }
  
  resetearTitulo () {
    this.nuevoTitulo.nativeElement.value=""
  }
 
  resetearInputs() {

    this.empresa.nativeElement.value=""
    this.puesto.nativeElement.value=""
    this.descripcion.nativeElement.value=""
    this.fechaFin.nativeElement.value=""
    this.fechaInicio.nativeElement.value=""
    this.url.nativeElement.value=""
    this.formularioInvalido=false;  

  }

  onSubmit ():void {
    if(this.formularioExperiencia.invalid) {
    this.habilitarBotonExperiencia=true
    this.formularioInvalido=true     
    } else {
    this.formularioExperiencia.reset()    
    this.habilitarBotonExperiencia=false
    }
  }

  toggleBtnExperiencia () {
    this.habilitarBotonExperiencia=true;
    this.formularioExperiencia.reset()
  }

  ocultarMensajeError () {   
    this.formularioInvalido=false
  } 

}
