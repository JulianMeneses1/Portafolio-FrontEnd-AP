import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Formacion } from 'src/app/interfaces/formacion-academica';
import { ArchivoService } from 'src/app/services/archivo.service';
declare var $: any;  



@Component({
  selector: 'app-formacion-academica-modal-editar',
  templateUrl: './formacion-academica-modal-editar.component.html',
  styleUrls: ['./formacion-academica-modal-editar.component.css']
})
export class FormacionAcademicaModalEditarComponent implements OnInit {

  nombreArchivo:string="";
  previsualizacionImagen: string="";
  formularioFormacion!: FormGroup;
  formularioInvalido: boolean = false;  
  archivoSubidoUrl: string = "";
  archivoCapturado: any;   
  tamañoMaximo:number = 3000000;
  errorImagen:boolean = false

  urlPattern:string = "[-a-zA-Z0-9@:%_\\+.~#?&//=]{2,256}\\.[a-z]{2,4}\\b(\\/[-a-zA-Z0-9@:%_\\+.~#?&//=]*)?"
  fechaInicioPattern:string = "(Enero|Marzo|Febrero|Mayo|Junio|Julio|Agosto|Septiembre|Octubre|Noviembre|Diciembre|Abril)\\s\\d{4}"
  fechaFinPattern:string = "((Enero|Marzo|Febrero|Mayo|Junio|Julio|Agosto|Septiembre|Octubre|Noviembre|Diciembre|Abril)\\s\\d{4})|Actualidad"

  @Input() formacion!: Formacion;

  @Output() enModificarFormacion: EventEmitter <Formacion> = new EventEmitter ()

  constructor(private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private servicioArchivo: ArchivoService) 
  { }

  ngOnInit ():void {
    this.formularioFormacion = this.formBuilder.group({
      id: [this.formacion.id],
      nombre: [this.formacion.nombre,[Validators.required]],
      institucion: [this.formacion.institucion,[Validators.required]],
      url_institucion: [this.formacion.url_institucion,[Validators.required,Validators.pattern(this.urlPattern)]],
      url_certificado: [this.formacion.url_certificado,[Validators.pattern(this.urlPattern)]],
      fecha_inicio: [this.formacion.fecha_inicio,[Validators.required,Validators.pattern(this.fechaInicioPattern)]],
      fecha_fin: [this.formacion.fecha_fin,[Validators.required,Validators.pattern(this.fechaFinPattern)]],
      descripcion: [this.formacion.descripcion,[Validators.required]],
      imagen: [''],
      persona: [{"id":1}],
      titulo_seccion: [{"id":4}]
    })
    this.archivoSubidoUrl=this.formacion.imagen
  }  

  resetearForm () {                                                           
    $("#formacion-modal-editar-" + this.formacion.id).on('hidden.bs.modal',  () => {
      this.formularioFormacion.patchValue(this.formacion);      
      this.formularioInvalido = false;
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
      this.formularioFormacion.get('imagen')?.setValue(this.archivoSubidoUrl);    
      this.formacion=this.formularioFormacion.value;    
      this.enModificarFormacion.emit(this.formacion);
      $("#formacion-modal-editar-" + this.formacion.id).modal('hide');  
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
        this.archivoSubidoUrl = response.url      
      }) 
}

capturarImagen(event:any) {
  this.archivoCapturado = event.target.files[0]
  if(this.archivoCapturado.size > this.tamañoMaximo) {
    this.formularioInvalido=true;
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
