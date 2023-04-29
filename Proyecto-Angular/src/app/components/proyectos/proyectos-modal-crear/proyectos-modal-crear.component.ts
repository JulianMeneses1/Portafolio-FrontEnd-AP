import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArchivoService } from 'src/app/services/archivo.service';
import { Proyecto } from 'src/app/interfaces/proyecto';
declare var $: any;    

@Component({
  selector: 'app-proyectos-modal-crear',
  templateUrl: './proyectos-modal-crear.component.html',
  styleUrls: ['./proyectos-modal-crear.component.css']
})
export class ProyectosModalCrearComponent implements OnInit {
  nombreArchivo:string="";
  previsualizacionImagen: string="";
  formularioProyecto!: FormGroup;
  formularioInvalido: boolean = false;
  archivoCapturado: any;
  archivoSubidoUrl: string = "" 

  @Output() enAgregarProyecto: EventEmitter <Proyecto> = new EventEmitter ()

  urlWebPattern:string = "[-a-zA-Z0-9@:%_\\+.~#?&//=]{2,256}\\.[a-z]{2,4}\\b(\\/[-a-zA-Z0-9@:%_\\+.~#?&//=]*)?"
  urlGitHubPattern:string = "(https?://)?(github\\.com)(/[\\w\\.@\\:/\\-~]+)+"
  tecnologiasPattern:RegExp = /(\w)((\,\w)+)?/

  constructor(
          private servicioArchivo : ArchivoService,
          private sanitizer: DomSanitizer, 
          private formBuilder: FormBuilder) 
  { }

  ngOnInit ():void {
    this.formularioProyecto = this.formBuilder.group({
      nombre: ['',[Validators.required]],
      descripcion: ['',[Validators.required]],
      url_sitio_web: ['',[Validators.pattern(this.urlWebPattern)]],
      url_github: ['',[Validators.required,Validators.pattern(this.urlGitHubPattern)]],
      tecnologias: ['',[Validators.required,Validators.pattern(this.tecnologiasPattern)]],
      imagen: ['',[Validators.required]],
      persona: [{"id":1}],
      titulo_seccion: [{"id":3}]
    })
  }

  resetearForm () {                                                           // para resetear el formulario cuando se hace click fuera del modal, 
                                                                              // o se apreta la tecla escape o se hace click en el botón cerrar
    $("#proyecto-modal-crear").on('hidden.bs.modal',  () => {
      this.formularioProyecto.reset();
      this.formularioProyecto.get('persona')?.setValue({"id":1});
      this.formularioProyecto.get('titulo_seccion')?.setValue({"id":1});
      this.formularioInvalido = false
      this.previsualizacionImagen="";
      this.nombreArchivo=""; 
      this.archivoSubidoUrl= "";   
      }
    ) 
  }

  onSubmit ():void {
    if(this.formularioProyecto.invalid) {    
      this.formularioInvalido=true     
      } else {
      const proyecto = this.formularioProyecto.value   
      this.enAgregarProyecto.emit(proyecto)
      $("#proyecto-modal-crear").modal('hide');  
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
        this.formularioProyecto.get('imagen')?.setValue(this.archivoSubidoUrl);
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
      })
}
