import { Component, ViewChild, ElementRef, OnInit, Output, EventEmitter} from '@angular/core';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-conocimientos-modal',
  templateUrl: './conocimientos-modal.component.html',
  styleUrls: ['./conocimientos-modal.component.css']
})
export class ConocimientosModalComponent implements OnInit {
  titulo:string="Conocimientos";
  modoEdicion:boolean=false;
  suscripcionAlternarEdicion?:Subscription;
  nombreArchivo:string="";
  previsualizacionImagen: string="";
  suscripcionBtnAceptar?:Subscription;
  formularioConocimientos!: FormGroup;
  formularioInvalido: boolean = false;
  habilitarBotonConocimientos:boolean = true

  nivelPattern:string = "[1-9]0"

  @Output() modificarTitulo: EventEmitter <string> = new EventEmitter ();

  @ViewChild('nuevoTitulo') nuevoTitulo!:ElementRef;
  @ViewChild('Nombre') nuevoNombre!:ElementRef; 
  @ViewChild('Nivel') nuevoNivel!:ElementRef;


  constructor(private servicioEdicion : ModoEdicionService,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder) 
  {
    this.suscripcionAlternarEdicion = this.servicioEdicion.onAlternar().subscribe(
      value => this.modoEdicion = value);
      this.suscripcionBtnAceptar = this.servicioEdicion.onAlternarFormConocimientos().subscribe(
        value => this.habilitarBotonConocimientos = value)
  }

  ngOnInit ():void {
    this.formularioConocimientos = this.formBuilder.group({
      nombre: ['',[Validators.required]],
      nivel: ['',[Validators.required, Validators.pattern(this.nivelPattern)]],
      imagen: ['',[Validators.required]]
    })
  }

  cambiarTitulo(){
    if (this.nuevoTitulo.nativeElement.value!=="") {
      this.titulo=this.nuevoTitulo.nativeElement.value;
      this.modificarTitulo.emit(this.titulo)
      this.nuevoTitulo.nativeElement.value=""
    }   
  }

  resetearTitulo(){
    this.nuevoTitulo.nativeElement.value=""
  }

  resetearInputs() {
    this.previsualizacionImagen=""
    this.nombreArchivo=""
    this.nuevoNombre.nativeElement.value=""
    this.nuevoNivel.nativeElement.value=""
    this.formularioInvalido=false;   
  }

  onSubmit ():void {
    if(this.formularioConocimientos.invalid) {
    this.habilitarBotonConocimientos=true
    this.formularioInvalido=true     
    } else {
    this.formularioConocimientos.reset()    
    this.habilitarBotonConocimientos=false
    this.previsualizacionImagen="";
    this.nombreArchivo=""
    }
  }

  toggleBtnConocimientos () {
    this.habilitarBotonConocimientos=true;
    this.formularioConocimientos.reset()
  }

  ocultarMensajeError () {   
    this.formularioInvalido=false
  } 

  capturarImagen(event:any) {
    const archivoCapturado = event.target.files[0]
    this.nombreArchivo=event.target.files[0].name
    this.extraerURL(archivoCapturado).then((imagen:any) => {
      this.previsualizacionImagen=imagen.base
    })    
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
      }
    )  

}