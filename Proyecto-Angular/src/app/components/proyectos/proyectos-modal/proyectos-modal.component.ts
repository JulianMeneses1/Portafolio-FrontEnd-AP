import { Component, OnInit, Output, EventEmitter} from '@angular/core';


import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TituloSeccionesService } from 'src/app/services/titulo-secciones.service';
import { TituloSeccion } from 'src/app/interfaces/titulo-seccion';
declare var $: any;    

@Component({
  selector: 'app-proyectos-modal',
  templateUrl: './proyectos-modal.component.html',
  styleUrls: ['./proyectos-modal.component.css']
})
export class ProyectosModalComponent implements OnInit {

  formularioProyecto!: FormGroup;
  formularioInvalido: boolean = false;
  miTitulo!: TituloSeccion

  @Output() actualizarTitulo: EventEmitter <any> = new EventEmitter ();  


  constructor(private formBuilder: FormBuilder,
    private servicioTituloSeccion: TituloSeccionesService) 
  {  }

  ngOnInit ():void {
    this.servicioTituloSeccion.obtenerTitulos().subscribe(data => {
      this.miTitulo=data[2];
      this.formularioProyecto = this.formBuilder.group({
        id: [''],
        titulo: ['',[Validators.required]]
      })
      this.formularioProyecto.patchValue(this.miTitulo)

    })
  }
  
  resetearForm () {                                                           // para resetear el formulario cuando se hace click fuera del modal, 
                                                                              // o se apreta la tecla escape o se hace click en el botón cerrar
    $("#proyecto-modal-titulo").on('hidden.bs.modal',  () => {
      this.formularioProyecto.patchValue(this.miTitulo)
      this.formularioInvalido = false  
      }
    ) 
  }

  onSubmit ():void {
    if(this.formularioProyecto.invalid) {    
      this.formularioInvalido=true     
      } else {
        this.miTitulo = this.formularioProyecto.value;
        this.servicioTituloSeccion.editarTitulo(this.formularioProyecto.value).subscribe();
        this.actualizarTitulo.emit(this.miTitulo)
      $("#proyecto-modal-titulo").modal('hide');   
      }
  }

  ocultarMensajeError () {   
    this.formularioInvalido=false
  } 

}