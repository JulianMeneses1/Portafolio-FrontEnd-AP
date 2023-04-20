import { Component, ElementRef, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { BannerService } from 'src/app/services/banner.service';
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
  titulo:string="Julián Meneses";
  subtitulo:string="Desarrollador Web Full Stack";  

  @Output() modificarTitulo: EventEmitter <string> = new EventEmitter ();
  @Output() modificarSubtitulo: EventEmitter <string> = new EventEmitter ();
  
  @ViewChild('nuevoTitulo') nuevoTitulo!:ElementRef; 
  @ViewChild('nuevoSubtitulo') nuevoSubtitulo!:ElementRef;   

  constructor(private servicioEdicion : ModoEdicionService,
    private servicioBanner: BannerService,
    private formBuilder: FormBuilder) 
    {
    this.suscripcionAlternarEdicion = this.servicioEdicion.onAlternarEdicion().subscribe(
      value => this.modoEdicion = value)
  }

  ngOnInit(): void {   
    this.formularioTitSub = this.formBuilder.group({
      id: [1],
      titulo: [this.titulo,[Validators.required]],
      subtitulo: [this.subtitulo,[Validators.required]]
    })
  }
 
  cambiarTexto(){
    
      this.titulo=this.nuevoTitulo.nativeElement.value;
      this.modificarTitulo.emit(this.titulo);

      this.subtitulo=this.nuevoSubtitulo.nativeElement.value;
      this.modificarSubtitulo.emit(this.subtitulo);
  }
  
  resetearForm () {                                                           // para resetear el formulario cuando se hace click fuera del modal, 
                                                                              // o se apreta la tecla escape o se hace click en el botón cerrar
    $("#textoModal").on('hidden.bs.modal',  () => {
      this.formularioTitSub.reset();
      this.formularioTitSub.get('titulo')?.setValue(this.titulo);
      this.formularioTitSub.get('subtitulo')?.setValue(this.subtitulo);
      this.formularioInvalido = false;    
      }
    ) 
  }

  onSubmit ():void {
    if(this.formularioTitSub.invalid) {
      this.formularioInvalido=true   
    } else {
    // this.cambiarTexto();
    this.servicioBanner.editarDatos(this.formularioTitSub.value).subscribe();
    $("#textoModal").modal('hide');
    this.formularioTitSub.get('titulo')?.setValue(this.titulo);
    this.formularioTitSub.get('subtitulo')?.setValue(this.subtitulo);
    }
  } 

  ocultarMensajeError () {   
    this.formularioInvalido=false
  } 
}
