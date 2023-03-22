import { Component, ViewChild, ElementRef, OnInit, Renderer2} from '@angular/core';
import { faSquarePen, faPlus, faX } from '@fortawesome/free-solid-svg-icons';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { Educacion } from 'src/app/interfaces/formacion-academica';
import { FormacionAcademica } from 'src/app/interfaces/mosk-formacion-academica';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-formacion-academica',
  templateUrl: './formacion-academica.component.html',
  styleUrls: ['./formacion-academica.component.css']
})
export class FormacionAcademicaComponent implements OnInit {

  titulo:string="Formación Académica"
  faSquarePen = faSquarePen;
  faPlus = faPlus;
  faX = faX;   
  modoEdicion:boolean=false;
  suscripcionAlternarEdicion?:Subscription; 
  formacionAcademica: Educacion[] = FormacionAcademica;
  suscripcionBtnAceptar?:Subscription;
  formularioFormacion!: FormGroup;
  formularioInvalido: boolean = false;
  habilitarBotonFormacion:boolean = true
  
  urlPattern:string = "[-a-zA-Z0-9@:%_\\+.~#?&//=]{2,256}\\.[a-z]{2,4}\\b(\\/[-a-zA-Z0-9@:%_\\+.~#?&//=]*)?"
  fechaPattern:string = "(Enero|Marzo|Febrero|Mayo|Junio|Julio|Agosto|Septiembre|Octubre|Noviembre|Diciembre|Abril)\\s\\d{4}"


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
    this.suscripcionAlternarEdicion = this.servicioEdicion.onAlternar().subscribe(
      value => this.modoEdicion = value)
      this.suscripcionBtnAceptar = this.servicioEdicion.onAlternarFormConocimientos().subscribe(
        value => this.habilitarBotonFormacion = value)
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
    this.habilitarBotonFormacion=true
    this.formularioInvalido=true     
    } else {
    this.formularioFormacion.reset()    
    this.habilitarBotonFormacion=false
    }
  }

  toggleBtnFormacion () {
    this.habilitarBotonFormacion=true;
    this.formularioInvalido=false
  }

  ocultarMensajeError () {   
    this.formularioInvalido=false
  }   
}







  
 

  
  
