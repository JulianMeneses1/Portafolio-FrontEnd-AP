import { Component, ElementRef, ViewChild, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { Banner } from 'src/app/interfaces/banner';
declare var $: any;                                                    // Usamos jQuery para poder acceder al modal y su método hide, que lo cierra manualmente

@Component({
  selector: 'app-banner-modal-imagen-perfil',
  templateUrl: './banner-modal-imagen-perfil.component.html',
  styleUrls: ['./banner-modal-imagen-perfil.component.css']
})
export class BannerModalImagenPerfilComponent implements OnInit{
  modoEdicion:boolean=false;
  suscripcionAlternarEdicion?:Subscription;  
  formularioPerfil!: FormGroup;
  formularioInvalido: boolean = false; 
  nombreArchivo:string="";
  previsualizacionImagen: string="";
  srcFotoPerfil:string="../assets/Foto Perfil.jpg"

  @Input() miBanner!: Banner;

  @ViewChild('fotoPerfil') fotoPerfil!:ElementRef; 

  constructor(private servicioEdicion : ModoEdicionService,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder) 
    {
    this.suscripcionAlternarEdicion = this.servicioEdicion.onAlternarEdicion().subscribe(
      value => this.modoEdicion = value);   
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
 
  

  
  
  resetearForm () {                                                           // para resetear el formulario cuando se hace click fuera del modal, 
                                                                              // o se apreta la tecla escape o se hace click en el botón cerrar
    $("#perfilModal").on('hidden.bs.modal',  () => {
      this.formularioPerfil.reset();
      this.formularioInvalido = false;
      this.previsualizacionImagen="";
      this.nombreArchivo=""        
      }
    ) 
  }

  onSubmit ():void {
    if(this.formularioPerfil.invalid) {    
    this.formularioInvalido=true;
    } else {

    $("#perfilModal").modal('hide');                            // Usando jQuery
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
