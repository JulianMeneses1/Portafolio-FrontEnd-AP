import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArchivoService } from 'src/app/services/archivo.service';
import { Formacion } from 'src/app/interfaces/formacion-academica';
declare var $: any; 

@Component({
  selector: 'app-formacion-academica-modal-crear',
  templateUrl: './formacion-academica-modal-crear.component.html',
  styleUrls: ['./formacion-academica-modal-crear.component.css']
})
export class FormacionAcademicaModalCrearComponent implements OnInit {

  nombreArchivo:string="";
  previsualizacionImagen: string="";
  archivoCapturado: any;
  archivoSubidoUrl: string = ""; 
  formularioFormacion!: FormGroup;
  formularioInvalido: boolean = false;
  tamañoMaximo:number = 3000000;
  errorImagen:boolean = false  

  @Output() enAgregarFormacion: EventEmitter <Formacion> = new EventEmitter ()

  urlPattern:string = "[-a-zA-Z0-9@:%_\\+.~#?&//=]{2,256}\\.[a-z]{2,4}\\b(\\/[-a-zA-Z0-9@:%_\\+.~#?&//=]*)?"
  fechaInicioPattern:string = "(Enero|Marzo|Febrero|Mayo|Junio|Julio|Agosto|Septiembre|Octubre|Noviembre|Diciembre|Abril)\\s\\d{4}"
  fechaFinPattern:string = "((Enero|Marzo|Febrero|Mayo|Junio|Julio|Agosto|Septiembre|Octubre|Noviembre|Diciembre|Abril)\\s\\d{4})|Actualidad"

  constructor(private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private servicioArchivo : ArchivoService) 
  { }

  ngOnInit ():void {
    this.formularioFormacion = this.formBuilder.group({
      nombre: ['',[Validators.required]],
      institucion: ['',[Validators.required]],
      url_institucion: ['',[Validators.required,Validators.pattern(this.urlPattern)]],
      url_certificado: ['',[Validators.pattern(this.urlPattern)]],
      fecha_inicio: ['',[Validators.required,Validators.pattern(this.fechaInicioPattern)]],
      fecha_fin: ['',[Validators.required,Validators.pattern(this.fechaFinPattern)]],
      descripcion: ['',[Validators.required]],
      imagen: ['',[Validators.required]],
      persona: [{"id":1}],
      titulo_seccion: [{"id":4}]
    })
  }

  resetearForm () {                                                           // para resetear el formulario cuando se hace click fuera del modal, 
                                                                              // o se apreta la tecla escape o se hace click en el botón cerrar
    $("#formacion-modal-crear").on('hidden.bs.modal',  () => {
      this.formularioFormacion.reset();
      this.formularioFormacion.get('persona')?.setValue({"id":1});
      this.formularioFormacion.get('titulo_seccion')?.setValue({"id":1});
      this.formularioInvalido = false
      this.previsualizacionImagen="";
      this.nombreArchivo=""; 
      this.archivoSubidoUrl= "";
      this.errorImagen=false             
      }
    ) 
  }
  
  onSubmit ():void {
    if(this.formularioFormacion.invalid) {
    this.formularioInvalido=true     
    } else {  
      const formacion = this.formularioFormacion.value   
      this.enAgregarFormacion.emit(formacion)  
      $("#formacion-modal-crear").modal('hide');  
    }
  }

  ocultarMensajeError () {   
    this.formularioInvalido=false;
    this.errorImagen=false 
  } 
  
  subirArchivo() {

    const formularioDeDatos = new FormData();
    formularioDeDatos.append('file',this.archivoCapturado)
    this.servicioArchivo.subirArchivo(formularioDeDatos)
      .subscribe(response => {
        this.archivoSubidoUrl = response.url;
        this.formularioFormacion.get('imagen')?.setValue(this.archivoSubidoUrl);
      }) 
}

capturarImagen(event:any) {
  this.archivoCapturado = event.target.files[0]
  if(this.archivoCapturado.size > this.tamañoMaximo) {
    this.errorImagen=true;
  } else {
    this.nombreArchivo=event.target.files[0].name
    this.extraerURL(this.archivoCapturado).then((imagen:any) => {
      this.previsualizacionImagen=imagen.base;      
    })
    this.subirArchivo();
  }   
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