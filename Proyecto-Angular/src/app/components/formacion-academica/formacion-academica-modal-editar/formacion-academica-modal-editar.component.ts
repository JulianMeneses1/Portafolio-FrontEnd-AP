import { Component, ViewChild, ElementRef, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;  
import { Educacion } from 'src/app/interfaces/formacion-academica';
import { FormacionAcademica } from 'src/app/interfaces/mosk-formacion-academica';

@Component({
  selector: 'app-formacion-academica-modal-editar',
  templateUrl: './formacion-academica-modal-editar.component.html',
  styleUrls: ['./formacion-academica-modal-editar.component.css']
})
export class FormacionAcademicaModalEditarComponent implements OnInit {

  titulo:string="Formación Académica"
  modoEdicion:boolean=false;
  suscripcionAlternarEdicion?:Subscription;
  nombreArchivo:string="";
  previsualizacionImagen: string="";
  formularioFormacion!: FormGroup;
  formularioInvalido: boolean = false;  
  urlPattern:string = "[-a-zA-Z0-9@:%_\\+.~#?&//=]{2,256}\\.[a-z]{2,4}\\b(\\/[-a-zA-Z0-9@:%_\\+.~#?&//=]*)?"
  fechaPattern:string = "((Enero|Marzo|Febrero|Mayo|Junio|Julio|Agosto|Septiembre|Octubre|Noviembre|Diciembre|Abril)\\s\\d{4})|Actualidad"

  @Input() educacion: Educacion = FormacionAcademica[0];

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
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder) 
  {    
    this.suscripcionAlternarEdicion = this.servicioEdicion.onAlternarEdicion().subscribe(
      value => this.modoEdicion = value)     
  }

  ngOnInit ():void {
    this.formularioFormacion = this.formBuilder.group({
      nombre: [this.educacion.nombre,[Validators.required]],
      institucion: [this.educacion.institucion,[Validators.required]],
      urlInstitucion: [this.educacion.urlInstitucion,[Validators.required,Validators.pattern(this.urlPattern)]],
      urlCertificado: [this.educacion.urlCertificado,[Validators.pattern(this.urlPattern)]],
      fechaInicio: [this.educacion.fechaInicio,[Validators.required,Validators.pattern(this.fechaPattern)]],
      fechaFin: [this.educacion.fechaFin,[Validators.required,Validators.pattern(this.fechaPattern)]],
      descripcion: [this.educacion.descripcion,[Validators.required]]
    })
  }
 

  onSubmit ():void {
    if(this.formularioFormacion.invalid) {
    this.formularioInvalido=true     
    } else {
      this.formularioFormacion.reset();    
      this.formularioInvalido=false;
      this.formularioFormacion.get('nombre')?.setValue(this.educacion.nombre);
      this.formularioFormacion.get('institucion')?.setValue(this.educacion.institucion);
      this.formularioFormacion.get('urlCertificado')?.setValue(this.educacion.urlCertificado);
      this.formularioFormacion.get('urlInstitucion')?.setValue(this.educacion.urlInstitucion);
      this.formularioFormacion.get('fechaInicio')?.setValue(this.educacion.fechaInicio);
      this.formularioFormacion.get('fechaFin')?.setValue(this.educacion.fechaFin);
      this.formularioFormacion.get('descripcion')?.setValue(this.educacion.descripcion);
      $("#educacion-modal-editar-" + this.educacion.id).modal('hide');  
    }
  }


  
  resetearForm () {                                                           
    $("#educacion-modal-editar-" + this.educacion.id).on('hidden.bs.modal',  () => {
      this.formularioFormacion.reset();
      this.formularioInvalido = false;
      this.formularioFormacion.get('nombre')?.setValue(this.educacion.nombre);
      this.formularioFormacion.get('institucion')?.setValue(this.educacion.institucion);
      this.formularioFormacion.get('urlCertificado')?.setValue(this.educacion.urlCertificado);
      this.formularioFormacion.get('urlInstitucion')?.setValue(this.educacion.urlInstitucion);
      this.formularioFormacion.get('fechaInicio')?.setValue(this.educacion.fechaInicio);
      this.formularioFormacion.get('fechaFin')?.setValue(this.educacion.fechaFin);
      this.formularioFormacion.get('descripcion')?.setValue(this.educacion.descripcion);
      this.previsualizacionImagen="";
      this.nombreArchivo="";       
    }
    ) 
  }

  ocultarMensajeError () {   
    this.formularioInvalido=false
  }
  
  capturarImagen(event:any) {
    const archivoCapturado = event.target.files[0]
    this.nombreArchivo=event.target.files[0].name
    this.extraerURL(archivoCapturado).then((imagen:any) => {
      this.previsualizacionImagen=imagen.base
    })    
  }

    // FUNCIÓN PARA EXTRAER LA URL DE LA IMAGEN

    extraerURL = async ($event:any) => new Promise ((resolve, reject) => {
      try {
        const unsafeImg = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
          base:reader.result
          });
        };
        reader.onerror = error => {
          resolve ({
          base:null
          });
        };
        } catch (e) {        
        }
      })
}
