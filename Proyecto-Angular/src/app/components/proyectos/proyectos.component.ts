import { Component, ViewChild, ElementRef} from '@angular/core';
import { faSquarePen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { Proyecto } from 'src/app/interfaces/proyecto';
import { Proyectos } from 'src/app/interfaces/mosk-proyecto';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent {
  titulo:string="Proyectos";
  faSquarePen = faSquarePen;
  faPlus = faPlus 
  modoEdicion:boolean=false;
  suscripcion?:Subscription;
  nombreArchivo:string="";
  previsualizacionImagen: string="";
 

  @ViewChild('nuevoTitulo') nuevoTitulo!:ElementRef;
  @ViewChild('Nombre') nuevoNombre!:ElementRef; 
  @ViewChild('Nivel') nuevoNivel!:ElementRef;

  proyectos: Proyecto[] = Proyectos

  constructor(private servicioEdicion : ModoEdicionService,
    private sanitizer: DomSanitizer) 
  {
    this.suscripcion = this.servicioEdicion.onAlternar().subscribe(
      value => this.modoEdicion = value)
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
    this.nuevoNivel.nativeElement.value=""  
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
