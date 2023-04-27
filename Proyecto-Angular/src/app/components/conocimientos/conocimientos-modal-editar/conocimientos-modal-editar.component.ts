import { Component, ViewChild, ElementRef, OnInit, Input} from '@angular/core';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Conocimientos } from 'src/app/interfaces/mosk-conocimientos';
import { Conocimiento } from 'src/app/interfaces/conocimiento';
declare var $: any;    


@Component({
  selector: 'app-conocimientos-modal-editar',
  templateUrl: './conocimientos-modal-editar.component.html',
  styleUrls: ['./conocimientos-modal-editar.component.css']
})
export class ConocimientosModalEditarComponent implements OnInit {
  modoEdicion:boolean=false;
  suscripcionAlternarEdicion?:Subscription;
  nombreArchivo:string="";
  previsualizacionImagen: string="";
  formularioConocimientos!: FormGroup;
  formularioInvalido: boolean = false;
  nivelPattern:string = "[1-9]0"

  @Input() conocimiento: Conocimiento = Conocimientos[0]; 

  @ViewChild('Nombre') nuevoNombre!:ElementRef; 
  @ViewChild('Nivel') nuevoNivel!:ElementRef;


  constructor(private servicioEdicion : ModoEdicionService,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder) 
  {
    this.suscripcionAlternarEdicion = this.servicioEdicion.onAlternarEdicion().subscribe(
      value => this.modoEdicion = value)     
  }

  ngOnInit ():void {
    this.formularioConocimientos = this.formBuilder.group({
      nombre: [this.conocimiento.nombre,[Validators.required]],
      nivel: [this.conocimiento.porcentaje_progreso.replace("skills-bar--",""),[Validators.required, Validators.pattern(this.nivelPattern)]]
    })
  }
  
  resetearForm () {                                                           // para resetear el formulario cuando se hace click fuera del modal, 
                                                                              // o se apreta la tecla escape o se hace click en el botón cerrar
    $("#conocimiento-modal-editar-"+ this.conocimiento.id).on('hidden.bs.modal',  () => {
      this.formularioConocimientos.reset();
      this.formularioInvalido = false
      this.formularioConocimientos.get('nombre')?.setValue(this.conocimiento.nombre);
      this.formularioConocimientos.get('nivel')?.setValue(this.conocimiento.porcentaje_progreso.replace("skills-bar--",""));
      this.previsualizacionImagen="";
      this.nombreArchivo="";   
      }
    ) 
  }

  onSubmit ():void {
    if(this.formularioConocimientos.invalid) {    
    this.formularioInvalido=true     
    } else {
    this.formularioConocimientos.reset();    
    this.formularioInvalido=false;
    this.formularioConocimientos.get('nombre')?.setValue(this.conocimiento.nombre);
      this.formularioConocimientos.get('nivel')?.setValue(this.conocimiento.porcentaje_progreso.replace("skills-bar--","")); 
    $("#conocimiento-modal-editar-"+ this.conocimiento.id).modal('hide');
    }
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