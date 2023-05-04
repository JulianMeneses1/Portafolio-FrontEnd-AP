import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Proyecto } from 'src/app/interfaces/proyecto';
import { ArchivoService } from 'src/app/services/archivo.service';

declare var $: any;    

@Component({
  selector: 'app-proyectos-modal-editar',
  templateUrl: './proyectos-modal-editar.component.html',
  styleUrls: ['./proyectos-modal-editar.component.css']
})
export class ProyectosModalEditarComponent implements OnInit {
  nombreArchivo:string="";
  previsualizacionImagen: string="";
  formularioProyecto!: FormGroup;
  formularioInvalido: boolean = false;
  archivoSubidoUrl: string = "";
  archivoCapturado: any;
  tamañoMaximo:number = 3000000;
  errorImagen:boolean = false   

  @Input() proyecto!: Proyecto; 

  @Output() enModificarProyecto: EventEmitter <Proyecto> = new EventEmitter ()

  urlWebPattern:string = "([-a-zA-Z0-9@:%_\\+.~#?&//=]{2,256}\\.[a-z]{2,4}\\b(\\/[-a-zA-Z0-9@:%_\\+.~#?&//=]*)?) || (https?://)?(github\\.com)(/[\\w\\.@\\:/\\-~]+)+"
  urlGitHubPattern:string = "(https?://)?(github\\.com)(/[\\w\\.@\\:/\\-~]+)+" 
  tecnologiasPattern:RegExp = /(\w\s)+/

  constructor(private sanitizer: DomSanitizer, 
    private formBuilder: FormBuilder,
    private servicioArchivo: ArchivoService) 
  {  }

  ngOnInit ():void {
    this.formularioProyecto = this.formBuilder.group({
      id: [this.proyecto.id],
      nombre: [this.proyecto.nombre,[Validators.required]],
      imagen: [''],
      descripcion: [this.proyecto.descripcion,[Validators.required]],
      url_sitio_web: [this.proyecto.url_sitio_web,[Validators.pattern(this.urlWebPattern)]],
      url_github: [this.proyecto.url_github,[Validators.required,Validators.pattern(this.urlGitHubPattern)]],
      tecnologias: [this.proyecto.tecnologias,[Validators.required,Validators.pattern(this.tecnologiasPattern)]],
      persona: [{"id":1}],
      titulo_seccion: [{"id":3}]
    })
    this.archivoSubidoUrl=this.proyecto.imagen
  }

  resetearForm () {                                                           // para resetear el formulario cuando se hace click fuera del modal, 
                                                                              // o se apreta la tecla escape o se hace click en el botón cerrar
    $("#proyecto-modal-editar").on('hidden.bs.modal',  () => {
      this.formularioProyecto.patchValue(this.proyecto);      
      this.formularioInvalido = false;
      this.previsualizacionImagen="";
      this.nombreArchivo="";   
      this.archivoSubidoUrl= ""; 
      this.errorImagen=false  
      }
    ) 
  }

  onSubmit ():void {
    if(this.formularioProyecto.invalid) {
    this.formularioInvalido=true     
    } else {
      this.formularioProyecto.get('imagen')?.setValue(this.archivoSubidoUrl);    
      this.proyecto=this.formularioProyecto.value;    
      this.enModificarProyecto.emit(this.proyecto);
      $("#proyecto-modal-editar-" + this.proyecto.id).modal('hide');  
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
      })
}
