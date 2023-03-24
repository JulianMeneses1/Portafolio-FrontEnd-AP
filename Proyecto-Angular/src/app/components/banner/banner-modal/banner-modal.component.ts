import { Component, ElementRef, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
declare var $: any;    

@Component({
  selector: 'app-banner-modal',
  templateUrl: './banner-modal.component.html',
  styleUrls: ['./banner-modal.component.css']
})
export class BannerModalComponent implements OnInit {
  modoEdicion:boolean=false;
  suscripcionAlternarEdicion?:Subscription;
  formularioBanner!: FormGroup;
  formularioInvalido: boolean = false;
  nombreArchivo:string="";
  previsualizacionImagen: string="";
  titulo:string="Julián Meneses";
  subtitulo:string="Desarrollador Web Full Stack";
  srcBanner:string="../assets/Banner.jpg";
  srcFotoPerfil:string="../assets/Foto Perfil.jpg"

  @Output() modificarTitulo: EventEmitter <string> = new EventEmitter ();
  @Output() modificarSubtitulo: EventEmitter <string> = new EventEmitter ();
  @Output() modificarBanner: EventEmitter <string> = new EventEmitter ();
  
  @ViewChild('banner') banner!:ElementRef; 
  @ViewChild('nuevoTitulo') nuevoTitulo!:ElementRef; 
  @ViewChild('nuevoSubtitulo') nuevoSubtitulo!:ElementRef;   

  constructor(private servicioEdicion : ModoEdicionService,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder) 
    {
    this.suscripcionAlternarEdicion = this.servicioEdicion.onAlternarEdicion().subscribe(
      value => this.modoEdicion = value)
  }

  ngOnInit(): void {   
    this.formularioBanner = this.formBuilder.group({
      banner: ['',[Validators.required]]
    })
  }

  capturarImagen(event:any) {
    const archivoCapturado = event.target.files[0]
    this.nombreArchivo=event.target.files[0].name
    this.extraerURL(archivoCapturado).then((imagen:any) => {
      this.previsualizacionImagen=imagen.base
    })    
  }

  cambiarBanner(){
    
    this.srcBanner = this.previsualizacionImagen;
    this.modificarBanner.emit(this.srcBanner);
    this.previsualizacionImagen="";
    this.nombreArchivo=""
  }  

 
  cambiarTexto(){
    if (this.nuevoTitulo.nativeElement.value!=="") {
      this.titulo=this.nuevoTitulo.nativeElement.value;
      this.modificarTitulo.emit(this.titulo);
      this.nuevoTitulo.nativeElement.value=""
    }
    if (this.nuevoSubtitulo.nativeElement.value!=="") {
      this.subtitulo=this.nuevoSubtitulo.nativeElement.value;
      this.modificarSubtitulo.emit(this.subtitulo);
      this.nuevoSubtitulo.nativeElement.value=""      
      } 
  }

  resetearTexto () {                                                           
    $("#textoModal").on('hidden.bs.modal',  () => {
      this.nuevoTitulo.nativeElement.value=""
      this.nuevoSubtitulo.nativeElement.value=""  
      }
    ) 
  }
  
  resetearForm () {                                                           // para resetear el formulario cuando se hace click fuera del modal, 
                                                                              // o se apreta la tecla escape o se hace click en el botón cerrar
    $("#bannerModal").on('hidden.bs.modal',  () => {
      this.formularioBanner.reset();
      this.formularioInvalido = false;
      this.previsualizacionImagen="";
      this.nombreArchivo=""        
      }
    ) 
  }

  onSubmit ():void {
    if(this.formularioBanner.invalid) {
      this.formularioInvalido=true   
    } else { 
    this.cambiarBanner()
    $("#bannerModal").modal('hide');  
    }
  } 

  ocultarMensajeError () {   
    this.formularioInvalido=false
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
  


