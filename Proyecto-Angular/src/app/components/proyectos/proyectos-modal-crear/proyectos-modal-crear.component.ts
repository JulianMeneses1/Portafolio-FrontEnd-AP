import { Component, ViewChild, ElementRef, OnInit, Output, EventEmitter} from '@angular/core';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;    

@Component({
  selector: 'app-proyectos-modal-crear',
  templateUrl: './proyectos-modal-crear.component.html',
  styleUrls: ['./proyectos-modal-crear.component.css']
})
export class ProyectosModalCrearComponent implements OnInit {
  modoEdicion:boolean=false;
  suscripcionAlternarEdicion?:Subscription;
  nombreArchivo:string="";
  previsualizacionImagen: string="";
  formularioProyecto!: FormGroup;
  formularioInvalido: boolean = false;

  urlWebPattern:string = "[-a-zA-Z0-9@:%_\\+.~#?&//=]{2,256}\\.[a-z]{2,4}\\b(\\/[-a-zA-Z0-9@:%_\\+.~#?&//=]*)?"
  urlGitHubPattern:string = "(https?://)?(github\\.com)(/[\\w\\.@\\:/\\-~]+)+"
  tecnologiasPattern:string = "((\\w)+\\s)+"
  
  @ViewChild('Nombre') nuevoNombre!:ElementRef; 
  @ViewChild('Descripcion') nuevaDescripcion!:ElementRef;
  @ViewChild('URLWeb') nuevaURLWeb!:ElementRef;
  @ViewChild('URLGitHub') nuevaURLGitHub!:ElementRef;
  @ViewChild('Tecnologias') nuevasTecnologias!:ElementRef;


  constructor(private servicioEdicion : ModoEdicionService,
    private sanitizer: DomSanitizer, private formBuilder: FormBuilder) 
  {
    this.suscripcionAlternarEdicion = this.servicioEdicion.onAlternarEdicion().subscribe(
      value => this.modoEdicion = value)     
  }

  ngOnInit ():void {
    this.formularioProyecto = this.formBuilder.group({
      nombre: ['',[Validators.required]],
      descripcion: ['',[Validators.required]],
      urlWeb: ['',[Validators.pattern(this.urlWebPattern)]],
      urlGitHub: ['',[Validators.required,Validators.pattern(this.urlGitHubPattern)]],
      tecnologias: ['',[Validators.required,Validators.pattern(this.tecnologiasPattern)]],
      imagen: ['',[Validators.required]]
    })
  }

  resetearForm () {                                                           // para resetear el formulario cuando se hace click fuera del modal, 
                                                                              // o se apreta la tecla escape o se hace click en el botón cerrar
    $("#proyecto-modal-crear").on('hidden.bs.modal',  () => {
      this.formularioProyecto.reset();
      this.formularioInvalido = false;
      this.previsualizacionImagen="";
      this.nombreArchivo="";       
      }
    ) 
  }

  onSubmit ():void {
    if(this.formularioProyecto.invalid) {
    this.formularioInvalido=true     
    } else {
    $("#proyecto-modal-crear").modal('hide');  
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
      })
}
