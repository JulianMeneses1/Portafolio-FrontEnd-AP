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

  @Input() experiencia: Experiencia = Experiencias [0]; 

  @ViewChild('empresa') empresa!:ElementRef;  
  @ViewChild('puesto') puesto!:ElementRef;  
  @ViewChild('url') url!:ElementRef;  
  @ViewChild('fechaInicio') fechaInicio!:ElementRef;  
  @ViewChild('fechaFin') fechaFin!:ElementRef;  
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
      empresa: [this.experiencia.empresa,[Validators.required]],
      puesto: [this.experiencia.puesto,[Validators.required]],
      url: [this.experiencia.urlEmpresa,[Validators.pattern(this.urlPattern)]],
      fechaInicio: [this.experiencia.fechaInicio,[Validators.required,Validators.pattern(this.fechaPattern)]],
      fechaFin: [this.experiencia.fechaFin,[Validators.required,Validators.pattern(this.fechaPattern)]],
      descripcion: [this.experiencia.descripcion,[Validators.required]]
    })
  }
  
  resetearForm () {                                                           // para resetear el formulario cuando se hace click fuera del modal, 
                                                                              // o se apreta la tecla escape o se hace click en el botón cerrar
    $("#experiencia-modal-editar-"+ this.experiencia.id).on('hidden.bs.modal',  () => {
      this.formularioExperiencia.reset();
      this.formularioInvalido = false
      this.formularioExperiencia.get('empresa')?.setValue(this.experiencia.empresa);
      this.formularioExperiencia.get('puesto')?.setValue(this.experiencia.puesto);
      this.formularioExperiencia.get('url')?.setValue(this.experiencia.urlEmpresa);
      this.formularioExperiencia.get('fechaInicio')?.setValue(this.experiencia.fechaInicio);
      this.formularioExperiencia.get('fechaFin')?.setValue(this.experiencia.fechaFin);
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
    this.formularioExperiencia.get('empresa')?.setValue(this.experiencia.empresa);
      this.formularioExperiencia.get('puesto')?.setValue(this.experiencia.puesto);
      this.formularioExperiencia.get('url')?.setValue(this.experiencia.urlEmpresa);
      this.formularioExperiencia.get('fechaInicio')?.setValue(this.experiencia.fechaInicio);
      this.formularioExperiencia.get('fechaFin')?.setValue(this.experiencia.fechaFin);
      this.formularioExperiencia.get('descripcion')?.setValue(this.experiencia.descripcion); 
    $("#experiencia-modal-editar-"+ this.experiencia.id).modal('hide');
    }
  }

  ocultarMensajeError () {   
    this.formularioInvalido=false
  } 
}