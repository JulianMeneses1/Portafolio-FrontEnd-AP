import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { BannerService } from 'src/app/services/banner.service';
import { Banner } from 'src/app/interfaces/banner';
declare var $: any;    

@Component({
  selector: 'app-banner-modal-titulo-subtitulo',
  templateUrl: './banner-modal-titulo-subtitulo.component.html',
  styleUrls: ['./banner-modal-titulo-subtitulo.component.css']
})
export class BannerModalTituloSubtituloComponent implements OnInit {

  modoEdicion:boolean=false;
  suscripcionAlternarEdicion?:Subscription;
  formularioInvalido: boolean = false; 
  formularioTitSub!: FormGroup;
  miBanner!: Banner;

  @Output() actualizarDatos: EventEmitter <Banner> = new EventEmitter ()

  constructor(private servicioEdicion : ModoEdicionService,
    private servicioBanner: BannerService,
    private formBuilder: FormBuilder) 
    {
    this.suscripcionAlternarEdicion = this.servicioEdicion.onAlternarEdicion().subscribe(
      value => this.modoEdicion = value);     
      
  }

  ngOnInit(): void { 
    this.servicioBanner.obtenerBanners().subscribe(data=> {
      this.miBanner=data[0];
      this.formularioTitSub = this.formBuilder.group({
        id: [''],
        titulo: ['',[Validators.required]],
        subtitulo: ['',[Validators.required]],
        imagen_perfil: [''],
        imagen_banner: ['']    
      })
      this.formularioTitSub.patchValue(this.miBanner)
    })
  }

  
  resetearForm () {                                                           // para resetear el formulario cuando se hace click fuera del modal, 
                                                                              // o se apreta la tecla escape o se hace click en el botón cerrar
    $("#textoModal").on('hidden.bs.modal',  () => {
      this.formularioTitSub.patchValue(this.miBanner);
      this.formularioInvalido = false;    
      }
    ) 
  }

  onSubmit ():void {
    if(this.formularioTitSub.invalid) {
      this.formularioInvalido=true   
    } else {
      this.miBanner = this.formularioTitSub.value;
      this.servicioBanner.editarBanner(this.formularioTitSub.value).subscribe();
      this.actualizarDatos.emit(this.miBanner)       
      $("#textoModal").modal('hide');
    }
  } 

  ocultarMensajeError () {   
    this.formularioInvalido=false
  } 
}
