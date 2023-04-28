import { Component, ViewChild, ElementRef, OnInit, Input} from '@angular/core';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Experiencias  } from 'src/app/interfaces/mosk-experiencia-laboral';
import { Experiencia } from 'src/app/interfaces/experiencia-laboral';
declare var $: any;    


@Component({
  selector: 'app-experiencia-laboral-modal-editar',
  templateUrl: './experiencia-laboral-modal-editar.component.html',
  styleUrls: ['./experiencia-laboral-modal-editar.component.css']
})
export class ExperienciaLaboralModalEditarComponent implements OnInit {
  modoEdicion:boolean=false;
  suscripcionAlternarEdicion?:Subscription;
  formularioExperiencia!: FormGroup;
  formularioInvalido: boolean = false;

  @Input() experiencia!: Experiencia ; 

  @ViewChild('nombre_empresa') nombre_empresa!:ElementRef;  
  @ViewChild('puesto') puesto!:ElementRef;  
  @ViewChild('url') url!:ElementRef;  
  @ViewChild('fecha_inicio') fecha_inicio!:ElementRef;  
  @ViewChild('fecha_fin') fecha_fin!:ElementRef;  
  @ViewChild('descripcion') descripcion!:ElementRef;  

  urlPattern:string = "[-a-zA-Z0-9@:%_\\+.~#?&//=]{2,256}\\.[a-z]{2,4}\\b(\\/[-a-zA-Z0-9@:%_\\+.~#?&//=]*)?"
  fechaPattern:string = "((Enero|Marzo|Febrero|Mayo|Junio|Julio|Agosto|Septiembre|Octubre|Noviembre|Diciembre|Abril)\\s\\d{4})|Actualidad"


  constructor(private servicioEdicion : ModoEdicionService,
    private formBuilder: FormBuilder) 
  {
    this.suscripcionAlternarEdicion = this.servicioEdicion.onAlternarEdicion().subscribe(
      value => this.modoEdicion = value)     
  }

  ngOnInit ():void {
    this.formularioExperiencia = this.formBuilder.group({
      nombre_empresa: [this.experiencia.nombre_empresa,[Validators.required]],
      puesto: [this.experiencia.puesto,[Validators.required]],
      url: [this.experiencia.url,[Validators.pattern(this.urlPattern)]],
      fecha_inicio: [this.experiencia.fecha_inicio,[Validators.required,Validators.pattern(this.fechaPattern)]],
      fecha_fin: [this.experiencia.fecha_fin,[Validators.required,Validators.pattern(this.fechaPattern)]],
      descripcion: [this.experiencia.descripcion,[Validators.required]]
    })
  }
  
  resetearForm () {                                                           // para resetear el formulario cuando se hace click fuera del modal, 
                                                                              // o se apreta la tecla escape o se hace click en el botón cerrar
    $("#experiencia-modal-editar-"+ this.experiencia.id).on('hidden.bs.modal',  () => {
      this.formularioExperiencia.reset();
      this.formularioInvalido = false
      this.formularioExperiencia.get('nombre_empresa')?.setValue(this.experiencia.nombre_empresa);
      this.formularioExperiencia.get('puesto')?.setValue(this.experiencia.puesto);
      this.formularioExperiencia.get('url')?.setValue(this.experiencia.url);
      this.formularioExperiencia.get('fecha_inicio')?.setValue(this.experiencia.fecha_inicio);
      this.formularioExperiencia.get('fecha_fin')?.setValue(this.experiencia.fecha_fin);
      this.formularioExperiencia.get('descripcion')?.setValue(this.experiencia.descripcion);
      }
    ) 
  }

  onSubmit ():void {
    if(this.formularioExperiencia.invalid) {    
    this.formularioInvalido=true     
    } else {
    this.formularioExperiencia.reset();    
    this.formularioInvalido=false;
    this.formularioExperiencia.get('nombre_empresa')?.setValue(this.experiencia.nombre_empresa);
      this.formularioExperiencia.get('puesto')?.setValue(this.experiencia.puesto);
      this.formularioExperiencia.get('url')?.setValue(this.experiencia.url);
      this.formularioExperiencia.get('fecha_inicio')?.setValue(this.experiencia.fecha_inicio);
      this.formularioExperiencia.get('fecha_fin')?.setValue(this.experiencia.fecha_fin);
      this.formularioExperiencia.get('descripcion')?.setValue(this.experiencia.descripcion); 
    $("#experiencia-modal-editar-"+ this.experiencia.id).modal('hide');
    }
  }

  ocultarMensajeError () {   
    this.formularioInvalido=false
  } 
}