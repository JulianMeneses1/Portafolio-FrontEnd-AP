import { Component, ViewChild, ElementRef} from '@angular/core';
import { faSquarePen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { Conocimiento } from 'src/app/interfaces/conocimiento';
import { Conocimientos } from 'src/app/interfaces/mosk-conocimientos';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-conocimientos',
  templateUrl: './conocimientos.component.html',
  styleUrls: ['./conocimientos.component.css']
})
export class ConocimientosComponent {
  titulo:string="Conocimientos";
  faSquarePen = faSquarePen;
  faPlus = faPlus 
  modoEdicion:boolean=false;
  suscripcion?:Subscription;
  nombreArchivo:string="";
  previsualizacionImagen: string="";

  @ViewChild('nuevoTitulo') nuevoTitulo!:ElementRef;
  @ViewChild('nuevoNombre') nuevoNombre!:ElementRef; 
  @ViewChild('nuevoNivel') nuevoNivel!:ElementRef;

  conocimientos: Conocimiento[] = Conocimientos

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
