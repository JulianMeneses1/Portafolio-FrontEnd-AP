import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Conocimiento } from 'src/app/interfaces/conocimiento';
import { ArchivoService } from 'src/app/services/archivo.service';

declare var $: any;    


@Component({
  selector: 'app-conocimientos-modal-editar',
  templateUrl: './conocimientos-modal-editar.component.html',
  styleUrls: ['./conocimientos-modal-editar.component.css']
})
export class ConocimientosModalEditarComponent implements OnInit { 

  nombreArchivo:string="";
  previsualizacionImagen: string="";
  formularioConocimientos!: FormGroup;
  formularioInvalido: boolean = false;
  archivoCapturado: any;   
  archivoSubidoUrl: string = "";
  tamañoMaximo:number = 3000000;
  errorImagen:boolean = false

  nivelPattern:string = "[1-9]0"

  @Input() conocimiento!: Conocimiento;  

  @Output() enModificarConocimiento: EventEmitter <Conocimiento> = new EventEmitter ()

  constructor(private sanitizer: DomSanitizer,
              private formBuilder: FormBuilder,
              private servicioArchivo: ArchivoService) 
    {}

  ngOnInit ():void {
    

    this.formularioConocimientos = this.formBuilder.group({
      id: [this.conocimiento.id],
      nombre: [this.conocimiento.nombre,[Validators.required]],
      nivel: [this.conocimiento.nivel.replace("skills-bar--",""),[Validators.required, Validators.pattern(this.nivelPattern)]],
      imagen: [''],
      persona: [{"id":1}],
      titulo_seccion: [{"id":1}]
    })
    this.archivoSubidoUrl=this.conocimiento.imagen
    
  }
  
  resetearForm () {                                                           // para resetear el formulario cuando se hace click fuera del modal, 
                                                                              // o se apreta la tecla escape o se hace click en el botón cerrar
    $("#conocimiento-modal-editar-"+ this.conocimiento.id).on('hidden.bs.modal',  () => {
      this.formularioConocimientos.patchValue(this.conocimiento);
      this.formularioConocimientos.get('nivel')?.setValue(this.conocimiento.nivel.replace("skills-bar--",""));
      this.formularioInvalido = false;
      this.previsualizacionImagen="";
      this.nombreArchivo="";   
      this.archivoSubidoUrl= ""; 
      this.errorImagen=false   
      }
    ) 
  }

  onSubmit ():void {
    if(this.formularioConocimientos.invalid) {    
    this.formularioInvalido=true     
    } else {
      this.formularioConocimientos.get('imagen')?.setValue(this.archivoSubidoUrl); 
      this.formularioConocimientos.get('nivel')?.setValue("skills-bar--" + 
        this.formularioConocimientos.get('nivel')?.value);
      this.conocimiento=this.formularioConocimientos.value;    
      this.enModificarConocimiento.emit(this.conocimiento);                
      $("#conocimiento-modal-editar-"+ this.conocimiento.id).modal('hide');
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
      }
    )  

}