import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AcercaDeMiService } from 'src/app/services/acerca-de-mi.service';
import { AcercaDeMi } from 'src/app/interfaces/acerca-de-mi';
declare var $: any;    

@Component({
  selector: 'app-acerca-de-mi-modal',
  templateUrl: './acerca-de-mi-modal.component.html',
  styleUrls: ['./acerca-de-mi-modal.component.css']
})
export class AcercaDeMiModalComponent implements OnInit {
  modoEdicion:boolean=false;
  suscripcionAlternarEdicion?:Subscription;
  formularioInvalido: boolean = false; 
  formularioAcercaDeMi!: FormGroup;
  miAcercaDeMi!: AcercaDeMi; 
  
  
  @Output() actualizarDatos: EventEmitter <AcercaDeMi> = new EventEmitter ()


  constructor(private servicioEdicion : ModoEdicionService,
          private formBuilder: FormBuilder,
          private servicioAcercaDeMi : AcercaDeMiService) 
  {
    this.suscripcionAlternarEdicion = this.servicioEdicion.onAlternarEdicion().subscribe(
      value => this.modoEdicion = value)
  }

  ngOnInit(): void {
    this.servicioAcercaDeMi.obtenerAcercaDeMi().subscribe(data=> {
        this.miAcercaDeMi=data[0];   
        this.formularioAcercaDeMi = this.formBuilder.group({
        id: [''],
        titulo: ['',[Validators.required]],
        descripcion: [this.miAcercaDeMi.descripcion,[Validators.required]]
      })
    this.formularioAcercaDeMi.patchValue(this.miAcercaDeMi);
    })
  }

  resetearForm () {                                                           // para resetear el formulario cuando se hace click fuera del modal, 
                                                                              // o se apreta la tecla escape o se hace click en el botón cerrar
    $("#acerca-de-mi-modal").on('hidden.bs.modal',  () => {
      this.formularioAcercaDeMi.patchValue(this.miAcercaDeMi);
      this.formularioInvalido = false;    
      }
    ) 
  }

  onSubmit ():void {
    if(this.formularioAcercaDeMi.invalid) {
      this.formularioInvalido=true 
    } else {
      this.miAcercaDeMi = this.formularioAcercaDeMi.value;
      this.servicioAcercaDeMi.editarAcercaDeMi(this.formularioAcercaDeMi.value).subscribe();
      this.actualizarDatos.emit(this.miAcercaDeMi) 
      $("#acerca-de-mi-modal").modal('hide');
    }
  } 

  ocultarMensajeError () {   
    this.formularioInvalido=false
  }  
}
