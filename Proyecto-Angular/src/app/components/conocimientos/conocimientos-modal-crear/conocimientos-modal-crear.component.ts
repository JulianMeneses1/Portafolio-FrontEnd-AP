import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Conocimiento } from 'src/app/interfaces/conocimiento';
import { ArchivoService } from 'src/app/services/archivo.service';
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
  archivoCapturado: any;
  archivoSubidoUrl: string = "" 

  nivelPattern:string = "[1-9]0"


  @Output() enAgregarConocimiento: EventEmitter <Conocimiento> = new EventEmitter ()


  constructor(private servicioEdicion : ModoEdicionService,
    private sanitizer: DomSanitizer,
    private servicioArchivo : ArchivoService,
    private formBuilder: FormBuilder) 
  {
    this.suscripcionAlternarEdicion = this.servicioEdicion.onAlternarEdicion().subscribe(
      value => this.modoEdicion = value)     
  }

  ngOnInit ():void {
    this.formularioConocimientos = this.formBuilder.group({
      nombre: ['',[Validators.required]],
      nivel: ['',[Validators.required, Validators.pattern(this.nivelPattern)]],
      imagen: ['',[Validators.required]],
      persona: [{"id":1}],
      titulo_seccion: [{"id":1}]
    })

  }
  
  resetearForm () {                                                           // para resetear el formulario cuando se hace click fuera del modal, 
                                                                              // o se apreta la tecla escape o se hace click en el botón cerrar
    $("#conocimiento-modal-crear").on('hidden.bs.modal',  () => {
      this.formularioConocimientos.reset();
      this.formularioConocimientos.get('persona')?.setValue({"id":1});
      this.formularioConocimientos.get('titulo_seccion')?.setValue({"id":1});
      this.formularioInvalido = false
      this.previsualizacionImagen="";
      this.nombreArchivo=""; 
      this.archivoSubidoUrl= "";       
      }
    ) 
  }

  onSubmit ():void {
    if(this.formularioConocimientos.invalid) {    
    this.formularioInvalido=true     
    } else {    
    this.formularioConocimientos.get('nivel')?.setValue("skills-bar--" + 
    this.formularioConocimientos.get('nivel')?.value);
    const conocimiento = this.formularioConocimientos.value   
    this.enAgregarConocimiento.emit(conocimiento)
    
    $("#conocimiento-modal-crear").modal('hide');
    }
  }

  ocultarMensajeError () {   
    this.formularioInvalido=false
  } 

  subirArchivo() {

    const formularioDeDatos = new FormData();
    formularioDeDatos.append('file',this.archivoCapturado)
    this.servicioArchivo.subirArchivo(formularioDeDatos)
      .subscribe(response => {
        this.archivoSubidoUrl = response.url;
        this.formularioConocimientos.get('imagen')?.setValue(this.archivoSubidoUrl);
      }) 
}

  capturarImagen(event:any) {
    this.archivoCapturado = event.target.files[0]
    this.nombreArchivo=event.target.files[0].name
    this.extraerURL(this.archivoCapturado).then((imagen:any) => {
      this.previsualizacionImagen=imagen.base
    })
    this.subirArchivo();    
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
