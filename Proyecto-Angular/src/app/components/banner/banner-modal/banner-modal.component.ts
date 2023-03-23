import { Component, ElementRef, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-banner-modal',
  templateUrl: './banner-modal.component.html',
  styleUrls: ['./banner-modal.component.css']
})
export class BannerModalComponent implements OnInit {
  modoEdicion:boolean=false;
  suscripcionAlternarEdicion?:Subscription;
  suscripcionBtnAceptar?:Subscription;
  formularioBanner!: FormGroup;
  formularioInvalido: boolean = false;
  habilitarBotonBanner:boolean = true
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
    this.suscripcionAlternarEdicion = this.servicioEdicion.onAlternar().subscribe(
      value => this.modoEdicion = value);
      this.suscripcionBtnAceptar = this.servicioEdicion.onAlternarFormBanner().subscribe(
        value => this.habilitarBotonBanner = value)
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

  eliminarImagen(){
    this.previsualizacionImagen="";
    this.nombreArchivo=""
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

  resetearInputs () {
    this.nuevoTitulo.nativeElement.value=""
    this.nuevoSubtitulo.nativeElement.value=""
    this.formularioInvalido=false;      
  }

  onSubmit ():void {
    if(this.formularioBanner.invalid) {
    this.habilitarBotonBanner=true
    this.formularioInvalido=true   
    } else {       
    this.habilitarBotonBanner=false 
    this.formularioBanner.reset()
    this.cambiarBanner() 
    }
  }

  toggleBtnBanner () {
    this.habilitarBotonBanner=true;
    this.formularioInvalido=false
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
  


