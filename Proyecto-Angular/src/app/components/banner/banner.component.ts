import { Component, ElementRef, Renderer2, ViewChild, OnInit } from '@angular/core';
import { faSquarePen } from '@fortawesome/free-solid-svg-icons';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})

export class BannerComponent implements OnInit {
  faSquarePen = faSquarePen 
  pantallaGrande:boolean=false; 
  modoEdicion:boolean=false;
  suscripcion?:Subscription;
  nombreArchivo:string="";
  previsualizacionImagen: string="";
  titulo:string="Julián Meneses";
  subtitulo:string="Desarrollador Web Full Stack"
  
  @ViewChild('banner') banner!:ElementRef; 
  @ViewChild('fotoPerfil') fotoPerfil!:ElementRef; 
  @ViewChild('nuevoTitulo') nuevoTitulo!:ElementRef; 
  @ViewChild('nuevoSubtitulo') nuevoSubtitulo!:ElementRef;   

  constructor(private servicioEdicion : ModoEdicionService,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2) {
    this.suscripcion = this.servicioEdicion.onAlternar().subscribe(
      value => this.modoEdicion = value)
  }

  ngOnInit(): void {    
    if(screen.width>1400){
      this.pantallaGrande=true
    }
  }

  capturarImagen(event:any) {
    const archivoCapturado = event.target.files[0]
    this.nombreArchivo=event.target.files[0].name
    this.extraerURL(archivoCapturado).then((imagen:any) => {
      this.previsualizacionImagen=imagen.base
    })    
  }

  eliminarImagen(){
    this.previsualizacionImagen="";
    this.nombreArchivo=""
  }

  cambiarBanner(){
    this.renderer.setAttribute(this.banner.nativeElement,"src", this.previsualizacionImagen);
    this.previsualizacionImagen="";
    this.nombreArchivo=""
  }

  cambiarFotoPerfil(){
    this.renderer.setAttribute(this.fotoPerfil.nativeElement,"src", this.previsualizacionImagen);
    this.previsualizacionImagen="";
    this.nombreArchivo=""
  } 
  cambiarTexto(){
    if (this.nuevoTitulo.nativeElement.value!=="") {
      this.titulo=this.nuevoTitulo.nativeElement.value;
      this.nuevoTitulo.nativeElement.value=""
    }
    if (this.nuevoSubtitulo.nativeElement.value!=="") {
      this.subtitulo=this.nuevoSubtitulo.nativeElement.value;
      this.nuevoSubtitulo.nativeElement.value=""      
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
  


