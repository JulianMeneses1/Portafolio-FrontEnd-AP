import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Experiencia } from 'src/app/interfaces/experiencia-laboral';
declare var $: any;  

@Component({
  selector: 'app-experiencia-laboral-modal-crear',
  templateUrl: './experiencia-laboral-modal-crear.component.html',
  styleUrls: ['./experiencia-laboral-modal-crear.component.css']
})
export class ExperienciaLaboralModalCrearComponent implements OnInit {


  formularioExperiencia!: FormGroup;
  formularioInvalido: boolean = false;  

  urlPattern:string = "[-a-zA-Z0-9@:%_\\+.~#?&//=]{2,256}\\.[a-z]{2,4}\\b(\\/[-a-zA-Z0-9@:%_\\+.~#?&//=]*)?"
  fechaFinPattern:string = "((Enero|Marzo|Febrero|Mayo|Junio|Julio|Agosto|Septiembre|Octubre|Noviembre|Diciembre|Abril)\\s\\d{4})|Actualidad"
  fechaInicioPattern:string = "(Enero|Marzo|Febrero|Mayo|Junio|Julio|Agosto|Septiembre|Octubre|Noviembre|Diciembre|Abril)\\s\\d{4}"
 
  @Input() experiencias !: Experiencia []
  @Output() enAgregarExperiencia: EventEmitter <Experiencia> = new EventEmitter ()

  constructor(private formBuilder: FormBuilder) 
  { }

  ngOnInit ():void {
    this.formularioExperiencia = this.formBuilder.group({
      nombre_empresa: ['',[Validators.required]],
      puesto: ['',[Validators.required]],
      url: ['',[Validators.pattern(this.urlPattern)]],
      fecha_inicio: ['',[Validators.required,Validators.pattern(this.fechaInicioPattern)]],
      fecha_fin: ['',[Validators.required,Validators.pattern(this.fechaFinPattern)]],
      descripcion: ['',[Validators.required]],
      posicion_Y: [''],
      persona: [{"id":1}],
      titulo_seccion: [{"id":2}]
    })

  }


  resetearForm () {                                                           // para resetear el formulario cuando se hace click fuera del modal, 
    // o se apreta la tecla escape o se hace click en el botón cerrar
    $("#experiencia-modal").on('hidden.bs.modal',  () => {
    this.formularioExperiencia.reset();
    this.formularioExperiencia.get('persona')?.setValue({"id":1});
    this.formularioExperiencia.get('titulo_seccion')?.setValue({"id":2});
    this.formularioInvalido = false;
               
    }) 
  }

  onSubmit ():void {
    if(this.formularioExperiencia.invalid) {
    this.formularioInvalido=true     
    } else {
      this.formularioExperiencia.get('posicion_Y')?.setValue("exp-bar-Y--" + 
        ((this.experiencias.length)*45));
      const experiencia = this.formularioExperiencia.value;   
      this.enAgregarExperiencia.emit(experiencia);      
      $("#experiencia-modal").modal('hide');      
    
    }
  }

  

  ocultarMensajeError () {   
    this.formularioInvalido=false
  } 

}
