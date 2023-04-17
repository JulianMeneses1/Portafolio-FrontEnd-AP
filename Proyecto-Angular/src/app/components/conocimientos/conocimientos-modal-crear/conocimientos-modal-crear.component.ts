import { Component, ViewChild, ElementRef, OnInit, Output, EventEmitter} from '@angular/core';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;    

@Component({
  selector: 'app-conocimientos-modal-crear',
  templateUrl: './conocimientos-modal-crear.component.html',
  styleUrls: ['./conocimientos-modal-crear.component.css']
})
export class ConocimientosModalCrearComponent implements OnInit {
  modoEdicion:boolean=false;
  suscripcionAlternarEdicion?:Subscription;
  nombreArchivo:string="";
  previsualizacionImagen: string="";
  formularioConocimientos!: FormGroup;
  formularioInvalido: boolean = false; 

  nivelPattern:string = "[1-9]0"


  @ViewChild('Nombre') nuevoNombre!:ElementRef; 
  @ViewChild('Nivel') nuevoNivel!:ElementRef;


  constructor(private servicioEdicion : ModoEdicionService,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder) 
  {
    this.suscripcionAlternarEdicion = this.servicioEdicion.onAlternarEdicion().subscribe(
      value => this.modoEdicion = value)     
  }

  ngOnInit ():void {
    this.formularioConocimientos = this.formBuilder.group({
      nombre: ['',[Validators.required]],
      nivel: ['',[Validators.required, Validators.pattern(this.nivelPattern)]],
      imagen: ['',[Validators.required]]
    })
  }
  
  resetearForm () {                                                           // para resetear el formulario cuando se hace click fuera del modal, 
                                                                              // o se apreta la tecla escape o se hace click en el botón cerrar
    $("#conocimiento-modal-crear").on('hidden.bs.modal',  () => {
      this.formularioConocimientos.reset();
      this.formularioInvalido = false
      this.previsualizacionImagen="";
      this.nombreArchivo="";        
      }
    ) 
  }

  onSubmit ():void {
    if(this.formularioConocimientos.invalid) {    
    this.formularioInvalido=true     
    } else {
    this.formularioConocimientos.reset();    
    this.formularioInvalido=false; 
    this.previsualizacionImagen="";
    this.nombreArchivo="";
    $("#conocimiento-modal-crear").modal('hide');
    }
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
      }
    )  

}
