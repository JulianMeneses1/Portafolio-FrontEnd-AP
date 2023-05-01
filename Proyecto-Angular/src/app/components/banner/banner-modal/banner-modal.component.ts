import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Banner } from 'src/app/interfaces/banner';
import { BannerService } from 'src/app/services/banner.service';
import { ArchivoService } from 'src/app/services/archivo.service';
declare var $: any;                           

@Component({
  selector: 'app-banner-modal',
  templateUrl: './banner-modal.component.html',
  styleUrls: ['./banner-modal.component.css']
})
export class BannerModalComponent implements OnInit{
  formularioBanner!: FormGroup;
  formularioInvalido: boolean = false; 
  nombreArchivoBanner:string="";  
  previsualizacionImagenBanner: string="";
  archivoCapturadoBanner: any;
  archivoSubidoUrlBanner: string = ""
  previsualizacionImagenPerfil: string="";
  archivoCapturadoPerfil: any;
  archivoSubidoUrlPerfil: string = ""
  nombreArchivoPerfil:string="";
  miBanner!: Banner;

  @Output() enActualizarBanner: EventEmitter <Banner> = new EventEmitter ()

  constructor(
    private servicioBanner : BannerService,
    private sanitizer: DomSanitizer,
    private servicioArchivo : ArchivoService,
    private formBuilder: FormBuilder) 
    { }

  ngOnInit(): void { 

    this.servicioBanner.obtenerBanners().subscribe(data=> {
      this.miBanner=data[0];
      this.formularioBanner = this.formBuilder.group({
        id: [''],
        titulo: ['',[Validators.required]],
        subtitulo: ['', [Validators.required]],
        imagen_perfil: [''],
        imagen_banner: ['']    
      })
      this.formularioBanner.patchValue(this.miBanner)
      this.archivoSubidoUrlBanner=this.miBanner.imagen_banner;
      this.archivoSubidoUrlPerfil=this.miBanner.imagen_perfil
    })  


  } 
  
  capturarImagenPerfil(event:any) {
    this.archivoCapturadoPerfil = event.target.files[0]
    this.nombreArchivoPerfil=event.target.files[0].name
    this.extraerURL(this.archivoCapturadoPerfil).then((imagen:any) => {
      this.previsualizacionImagenPerfil=imagen.base;      
    })
    this.subirImagenPerfil();
     
  } 

  capturarImagenBanner(event:any) {
    this.archivoCapturadoBanner = event.target.files[0]
    this.nombreArchivoBanner=event.target.files[0].name
    this.extraerURL(this.archivoCapturadoBanner).then((imagen:any) => {
      this.previsualizacionImagenBanner=imagen.base;      
    })
    this.subirImagenBanner();
     
  } 
  
  subirImagenPerfil() {

      const formularioDeDatos = new FormData();
      formularioDeDatos.append('file',this.archivoCapturadoPerfil)
      this.servicioArchivo.subirArchivo(formularioDeDatos)
        .subscribe(response => {
          this.archivoSubidoUrlPerfil = response.url    
          console.log(response.url)  
        }) 
  }

    
  subirImagenBanner() {

    const formularioDeDatos = new FormData();
    formularioDeDatos.append('file',this.archivoCapturadoBanner)
    this.servicioArchivo.subirArchivo(formularioDeDatos)
      .subscribe(response => {
        this.archivoSubidoUrlBanner = response.url 
        console.log(response.url)      
      }) 
}
  
  resetearForm () {                                                           // para resetear el formulario cuando se hace click fuera del modal, 
                                                                              // o se apreta la tecla escape o se hace click en el botón cerrar
    $("#bannerModal").on('hidden.bs.modal',  () => {
      this.formularioBanner.patchValue(this.miBanner);
      this.formularioInvalido = false;    
      this.previsualizacionImagenBanner="";
      this.nombreArchivoBanner="";
      this.previsualizacionImagenPerfil="";
      this.nombreArchivoPerfil="";      
      }
    ) 
  }

  onSubmit ():void {
    if(this.formularioBanner.invalid) {    
    this.formularioInvalido=true;
    } else {  
      this.formularioBanner.get('imagen_perfil')?.setValue(this.archivoSubidoUrlPerfil);
      this.formularioBanner.get('imagen_banner')?.setValue(this.archivoSubidoUrlBanner);
      this.miBanner = this.formularioBanner.value;
      this.servicioBanner.editarBanner(this.formularioBanner.value).subscribe();
      this.enActualizarBanner.emit(this.miBanner)
      console.log("mi banner" + JSON.stringify(this.miBanner))
      console.log("formulario valor " + JSON.stringify(this.formularioBanner.value))
      $("#bannerModal").modal('hide');   // Usando jQuery                   
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
