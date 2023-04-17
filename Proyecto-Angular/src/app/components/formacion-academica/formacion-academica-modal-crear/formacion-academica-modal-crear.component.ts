import { Component, ViewChild, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;  


@Component({
  selector: 'app-formacion-academica-modal-crear',
  templateUrl: './formacion-academica-modal-crear.component.html',
  styleUrls: ['./formacion-academica-modal-crear.component.css']
})
export class FormacionAcademicaModalCrearComponent implements OnInit {

  modoEdicion:boolean=false;
  suscripcionAlternarEdicion?:Subscription;
  nombreArchivo:string="";
  previsualizacionImagen: string="";
  formularioFormacion!: FormGroup;
  formularioInvalido: boolean = false;  
  urlPattern:string = "[-a-zA-Z0-9@:%_\\+.~#?&//=]{2,256}\\.[a-z]{2,4}\\b(\\/[-a-zA-Z0-9@:%_\\+.~#?&//=]*)?"
  fechaPattern:string = "((Enero|Marzo|Febrero|Mayo|Junio|Julio|Agosto|Septiembre|Octubre|Noviembre|Diciembre|Abril)\\s\\d{4})|Actualidad"

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
      nombre: ['',[Validators.required]],
      institucion: ['',[Validators.required]],
      urlInstitucion: ['',[Validators.required,Validators.pattern(this.urlPattern)]],
      urlCertificado: ['',[Validators.pattern(this.urlPattern)]],
      fechaInicio: ['',[Validators.required,Validators.pattern(this.fechaPattern)]],
      fechaFin: ['',[Validators.required,Validators.pattern(this.fechaPattern)]],
      descripcion: ['',[Validators.required]],
      imagen: ['',[Validators.required]]
    })
  }


  onSubmit ():void {
    if(this.formularioFormacion.invalid) {
    this.formularioInvalido=true     
    } else {    
    $("#educacion-modal").modal('hide');  
    }
  }
  
  resetearForm () {                                                           // para resetear el formulario cuando se hace click fuera del modal, 
                                                                              // o se apreta la tecla escape o se hace click en el botón cerrar
    $("#educacion-modal").on('hidden.bs.modal',  () => {
      this.formularioFormacion.reset();
      this.formularioInvalido = false;
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