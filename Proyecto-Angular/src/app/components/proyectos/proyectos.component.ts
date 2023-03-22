import { Component, ViewChild, ElementRef, OnInit} from '@angular/core';
import { faSquarePen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { Proyecto } from 'src/app/interfaces/proyecto';
import { Proyectos } from 'src/app/interfaces/mosk-proyecto';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  titulo:string="Proyectos";
  faSquarePen = faSquarePen;
  faPlus = faPlus 
  modoEdicion:boolean=false;
  suscripcionAlternarEdicion?:Subscription;
  nombreArchivo:string="";
  previsualizacionImagen: string="";
  suscripcionBtnAceptar?:Subscription;
  formularioProyecto!: FormGroup;
  formularioInvalido: boolean = false;
  habilitarBotonProyecto:boolean = true

  urlWebPattern:string = "[-a-zA-Z0-9@:%_\\+.~#?&//=]{2,256}\\.[a-z]{2,4}\\b(\\/[-a-zA-Z0-9@:%_\\+.~#?&//=]*)?"
  urlGitHubPattern:string = "(https?://)?(github\\.com)(/[\\w\\.@\\:/\\-~]+)+"
  tecnologiasPattern:string = "((\\w)+\\s)+"
  

  @ViewChild('nuevoTitulo') nuevoTitulo!:ElementRef;
  @ViewChild('Nombre') nuevoNombre!:ElementRef; 
  @ViewChild('Descripcion') nuevaDescripcion!:ElementRef;
  @ViewChild('URLWeb') nuevaURLWeb!:ElementRef;
  @ViewChild('URLGitHub') nuevaURLGitHub!:ElementRef;
  @ViewChild('Tecnologias') nuevasTecnologias!:ElementRef;

  proyectos: Proyecto[] = Proyectos

  constructor(private servicioEdicion : ModoEdicionService,
    private sanitizer: DomSanitizer, private formBuilder: FormBuilder) 
  {
    this.suscripcionAlternarEdicion = this.servicioEdicion.onAlternar().subscribe(
      value => this.modoEdicion = value);
      this.suscripcionBtnAceptar = this.servicioEdicion.onAlternarFormProyectos().subscribe(
        value => this.habilitarBotonProyecto = value)
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

  cambiarTitulo(){
    if (this.nuevoTitulo.nativeElement.value!=="") {
      this.titulo=this.nuevoTitulo.nativeElement.value;
      this.nuevoTitulo.nativeElement.value=""
    }   
  }

  resetearTitulo(){
    this.nuevoTitulo.nativeElement.value=""
  }

  resetearInputs() {
    this.previsualizacionImagen=""
    this.nombreArchivo=""
    this.nuevoNombre.nativeElement.value=""
    this.nuevasTecnologias.nativeElement.value=""
    this.nuevaURLGitHub.nativeElement.value=""
    this.nuevaURLWeb.nativeElement.value=""
    this.nuevaDescripcion.nativeElement.value="" 
    this.formularioInvalido=false;   
  }

  onSubmit ():void {
    if(this.formularioProyecto.invalid) {
    this.habilitarBotonProyecto=true
    this.formularioInvalido=true     
    } else {
    this.formularioProyecto.reset()    
    this.habilitarBotonProyecto=false
    this.previsualizacionImagen="";
    this.nombreArchivo=""
    }
  }

  toggleBtnProyecto () {
    this.habilitarBotonProyecto=true;
    this.formularioProyecto.reset()
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
