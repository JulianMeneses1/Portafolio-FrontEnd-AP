import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { Banner } from 'src/app/interfaces/banner';
import { BannerService } from 'src/app/services/banner.service';
import { ArchivoService } from 'src/app/services/archivo.service';
declare var $: any;    

@Component({
  selector: 'app-banner-modal-imagen-banner',
  templateUrl: './banner-modal-imagen-banner.component.html',
  styleUrls: ['./banner-modal-imagen-banner.component.css']
})
export class BannerModalImagenBannerComponent implements OnInit {
  modoEdicion:boolean=false;
  suscripcionAlternarEdicion?:Subscription;
  formularioBanner!: FormGroup;
  formularioInvalido: boolean = false;
  nombreArchivo:string="";
  previsualizacionImagen: string=""
  miBanner!: Banner;
  archivoCapturado: any;
  archivoSubidoUrl: string = ""
  
  @Output() actualizarDatos: EventEmitter <Banner> = new EventEmitter ()


  constructor(private servicioEdicion : ModoEdicionService,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private servicioArchivo : ArchivoService,
    private servicioBanner : BannerService) 
    {
    this.suscripcionAlternarEdicion = this.servicioEdicion.onAlternarEdicion().subscribe(
      value => this.modoEdicion = value)
  }

  ngOnInit(): void { 
    
    this.servicioBanner.obtenerBanners().subscribe(data=> {
      this.miBanner=data[0];
      this.formularioBanner = this.formBuilder.group({
        id: [''],
        titulo: [''],
        subtitulo: [''],
        imagen_perfil: [''],
        imagen_banner: ['']    
      })
      this.formularioBanner.patchValue(this.miBanner)
    })
  }

  capturarImagen(event:any) {
    this.archivoCapturado = event.target.files[0]
    this.nombreArchivo=event.target.files[0].name
    this.extraerURL(this.archivoCapturado).then((imagen:any) => {
      this.previsualizacionImagen=imagen.base
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
    $("#bannerModal").on('hidden.bs.modal',  () => {
      this.formularioBanner.patchValue(this.miBanner);
      this.formularioInvalido = false; 
      this.previsualizacionImagen="";
      this.nombreArchivo="";
      this.archivoSubidoUrl= "";        
      }
    ) 
  }

  onSubmit ():void {
    if(this.archivoSubidoUrl=="") {
      this.formularioInvalido=true   
    } else {
    this.formularioBanner.get('imagen_banner')?.setValue(this.archivoSubidoUrl); 
    this.miBanner = this.formularioBanner.value;
    this.servicioBanner.editarBanner(this.formularioBanner.value).subscribe();
    this.actualizarDatos.emit(this.miBanner)
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
