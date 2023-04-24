import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { Banner } from 'src/app/interfaces/banner';
import { BannerService } from 'src/app/services/banner.service';
import { ArchivoService } from 'src/app/services/archivo.service';
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
  miBanner!: Banner;
  archivoCapturado: any;
  archivoSubidoUrl: string = ""

  @Output() actualizarDatos: EventEmitter <Banner> = new EventEmitter ()

  constructor(private servicioEdicion : ModoEdicionService,
    private servicioBanner : BannerService,
    private sanitizer: DomSanitizer,
    private servicioArchivo : ArchivoService,
    private formBuilder: FormBuilder) 
    {
    this.suscripcionAlternarEdicion = this.servicioEdicion.onAlternarEdicion().subscribe(
      value => this.modoEdicion = value);   
  }

  ngOnInit(): void { 

    this.servicioBanner.obtenerDatos().subscribe(data=> {
      this.miBanner=data[0];
      this.formularioPerfil = this.formBuilder.group({
        id: [''],
        titulo: [''],
        subtitulo: [''],
        imagen_perfil: [''],
        imagen_banner: ['']    
      })
      this.formularioPerfil.patchValue(this.miBanner)
    })  

  } 
  
  capturarImagen(event:any) {
    this.archivoCapturado = event.target.files[0]
    this.nombreArchivo=event.target.files[0].name
    this.extraerURL(this.archivoCapturado).then((imagen:any) => {
      this.previsualizacionImagen=imagen.base;      
    })
    this.subirArchivo();
     
  } 
  
  subirArchivo() {

      const formularioDeDatos = new FormData();
      formularioDeDatos.append('file',this.archivoCapturado)
      this.servicioArchivo.subirArchivo(formularioDeDatos)
        .subscribe(response => {
          this.archivoSubidoUrl = response.url      
        }) 
  }
  
  resetearForm () {                                                           // para resetear el formulario cuando se hace click fuera del modal, 
                                                                              // o se apreta la tecla escape o se hace click en el botón cerrar
    $("#perfilModal").on('hidden.bs.modal',  () => {
      this.formularioPerfil.patchValue(this.miBanner);
      this.formularioInvalido = false;    
      this.previsualizacionImagen="";
      this.nombreArchivo="";
      this.archivoSubidoUrl= "";
      
      }
    ) 
  }

  onSubmit ():void {
    if(this.archivoSubidoUrl=="") {    
    this.formularioInvalido=true;
    } else {  
      this.formularioPerfil.get('imagen_perfil')?.setValue(this.archivoSubidoUrl);
      this.miBanner = this.formularioPerfil.value;
      this.servicioBanner.editarDatos(this.formularioPerfil.value).subscribe();
      this.actualizarDatos.emit(this.miBanner)
      $("#perfilModal").modal('hide');   // Usando jQuery                   
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
