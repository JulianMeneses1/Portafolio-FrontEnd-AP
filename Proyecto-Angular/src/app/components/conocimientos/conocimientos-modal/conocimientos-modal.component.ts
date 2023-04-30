import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TituloSeccion } from 'src/app/interfaces/titulo-seccion';
import { TituloSeccionesService } from 'src/app/services/titulo-secciones.service';
declare var $: any;    

@Component({
  selector: 'app-conocimientos-modal',
  templateUrl: './conocimientos-modal.component.html',
  styleUrls: ['./conocimientos-modal.component.css']
})
export class ConocimientosModalComponent implements OnInit {
  formularioConocimientos!: FormGroup;
  formularioInvalido: boolean = false; 
  miTitulo!: TituloSeccion

  @Output() actualizarTitulo: EventEmitter <TituloSeccion> = new EventEmitter (); 


  constructor(private formBuilder: FormBuilder,
    private servicioTituloSeccion: TituloSeccionesService) 
  { }

  ngOnInit ():void {
    this.servicioTituloSeccion.obtenerTitulos().subscribe(data => {
      this.miTitulo=data[0];
      this.formularioConocimientos = this.formBuilder.group({
        id: [''],
        titulo: ['',[Validators.required]]
      })
      this.formularioConocimientos.patchValue(this.miTitulo)

    })
    
  }
  
  resetearForm () {                                                           // para resetear el formulario cuando se hace click fuera del modal, 
                                                                              // o se apreta la tecla escape o se hace click en el botón cerrar
    $("#conocimiento-modal-titulo").on('hidden.bs.modal',  () => {
      this.formularioConocimientos.patchValue(this.miTitulo)
      this.formularioInvalido = false  
      }
    ) 
  }

  onSubmit ():void {
    if(this.formularioConocimientos.invalid) {    
    this.formularioInvalido=true     
    } else {
      this.miTitulo = this.formularioConocimientos.value;
      this.servicioTituloSeccion.editarTitulo(this.formularioConocimientos.value).subscribe();
      
      this.actualizarTitulo.emit(this.miTitulo)
    $("#conocimiento-modal-titulo").modal('hide');   
    }
  }

  ocultarMensajeError () {   
    this.formularioInvalido=false
  }    

}






