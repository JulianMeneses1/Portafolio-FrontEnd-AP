import { Component, ElementRef, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
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
  srcBanner: string="../assets/Banner.jpg";
  previsualizacionImagen: string=""

  @Output() modificarBanner: EventEmitter <string> = new EventEmitter ();
  
  @ViewChild('banner') banner!:ElementRef; 


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
    this.cambiarBanner();
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
