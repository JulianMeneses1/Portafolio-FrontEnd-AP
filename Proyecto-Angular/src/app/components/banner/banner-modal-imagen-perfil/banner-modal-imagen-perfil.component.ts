import { Component, ElementRef, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-banner-modal-imagen-perfil',
  templateUrl: './banner-modal-imagen-perfil.component.html',
  styleUrls: ['./banner-modal-imagen-perfil.component.css']
})
export class BannerModalImagenPerfilComponent implements OnInit{
  modoEdicion:boolean=false;
  suscripcionAlternarEdicion?:Subscription;
  suscripcionBtnAceptar?:Subscription;
  formularioPerfil!: FormGroup;
  formularioInvalido: boolean = false;
  habilitarBotonPerfil:boolean = true
  nombreArchivo:string="";
  previsualizacionImagen: string="";
  srcFotoPerfil:string="../assets/Foto Perfil.jpg"


  @Output() modificarFotoPerfil: EventEmitter <string> = new EventEmitter ();

  @ViewChild('fotoPerfil') fotoPerfil!:ElementRef; 

  constructor(private servicioEdicion : ModoEdicionService,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder) 
    {
    this.suscripcionAlternarEdicion = this.servicioEdicion.onAlternar().subscribe(
      value => this.modoEdicion = value);
      this.suscripcionBtnAceptar = this.servicioEdicion.onAlternarFormPerfil().subscribe(
        value => this.habilitarBotonPerfil = value)
  }

  ngOnInit(): void {   
    this.formularioPerfil = this.formBuilder.group({
      fotoPerfil: ['',[Validators.required]]
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
  
  
  cambiarFotoPerfil(){
      this.srcFotoPerfil = this.previsualizacionImagen;
      this.modificarFotoPerfil.emit(this.srcFotoPerfil);
      this.previsualizacionImagen="";
      this.nombreArchivo=""   
  } 

  resetearInputs () {   
    this.formularioInvalido=false;      
  }

  onSubmit ():void {
    if(this.formularioPerfil.invalid) {
    this.habilitarBotonPerfil=true;
    this.formularioInvalido=true;
    } else {        
    this.habilitarBotonPerfil=false;
    this.formularioPerfil.reset();
    this.cambiarFotoPerfil()
    $("#perfilModal").modal('hide');       
    }
  }

  toggleBtnPerfil () {
    this.habilitarBotonPerfil=true;
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
