import { Component, ViewChild, ElementRef, OnInit, Input, Output, EventEmitter} from '@angular/core';
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

  @Output() enModificarExperiencia: EventEmitter <Experiencia> = new EventEmitter ()

  urlPattern:string = "[-a-zA-Z0-9@:%_\\+.~#?&//=]{2,256}\\.[a-z]{2,4}\\b(\\/[-a-zA-Z0-9@:%_\\+.~#?&//=]*)?"
  fechaFinPattern:string = "((Enero|Marzo|Febrero|Mayo|Junio|Julio|Agosto|Septiembre|Octubre|Noviembre|Diciembre|Abril)\\s\\d{4})|Actualidad"
  fechaInicioPattern:string = "(Enero|Marzo|Febrero|Mayo|Junio|Julio|Agosto|Septiembre|Octubre|Noviembre|Diciembre|Abril)\\s\\d{4}"


  constructor(private formBuilder: FormBuilder) 
  {  }

  ngOnInit ():void {
    this.formularioExperiencia = this.formBuilder.group({
      id: [this.experiencia.id],
      nombre_empresa: [this.experiencia.nombre_empresa,[Validators.required]],
      puesto: [this.experiencia.puesto,[Validators.required]],
      url: [this.experiencia.url,[Validators.pattern(this.urlPattern)]],
      fecha_inicio: [this.experiencia.fecha_inicio,[Validators.required,Validators.pattern(this.fechaInicioPattern)]],
      fecha_fin: [this.experiencia.fecha_fin,[Validators.required,Validators.pattern(this.fechaFinPattern)]],
      descripcion: [this.experiencia.descripcion,[Validators.required]],
      posicion_Y: [this.experiencia.posicion_Y],
      persona: [{"id":1}],
      titulo_seccion: [{"id":2}]
    })
  }
  
  resetearForm () {                                                           // para resetear el formulario cuando se hace click fuera del modal, 
                                                                              // o se apreta la tecla escape o se hace click en el botón cerrar
    $("#experiencia-modal-editar-"+ this.experiencia.id).on('hidden.bs.modal',  () => {
      this.formularioExperiencia.patchValue(this.experiencia);
      this.formularioInvalido = false
      
      }
    ) 
  }

  onSubmit ():void {
    if(this.formularioExperiencia.invalid) {    
    this.formularioInvalido=true     
    } else {
      this.experiencia=this.formularioExperiencia.value;    
      this.enModificarExperiencia.emit(this.experiencia);

      $("#experiencia-modal-editar-"+ this.experiencia.id).modal('hide');
    }
  }

  ocultarMensajeError () {   
    this.formularioInvalido=false
  } 
}