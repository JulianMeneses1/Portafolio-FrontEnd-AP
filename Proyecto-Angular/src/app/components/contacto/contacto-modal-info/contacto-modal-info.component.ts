import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { faSquarePen, faUser, faEnvelope, faFileLines } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Persona } from 'src/app/interfaces/persona';
import { PersonaService } from 'src/app/services/persona.service';
declare var $: any;

@Component({
  selector: 'app-contacto-modal-info',
  templateUrl: './contacto-modal-info.component.html',
  styleUrls: ['./contacto-modal-info.component.css']
})
export class ContactoModalInfoComponent implements OnInit{

  faSquarePen = faSquarePen;
  faUser = faUser;
  faEnvelop = faEnvelope;
  faFileLines = faFileLines;
  formularioContacto!: FormGroup;
  formularioInvalido: boolean = false;
  persona!: Persona;  

  @Output() enModificarPersona: EventEmitter <Persona> = new EventEmitter ()


  telefonoPattern:string="([0-9]?\\d{3}-\\d{7})|([+][\\s]?\\d{2}[ ]\\d{1}[ ][0-9]?\\d{3}-\\d{7})"

  constructor(private formBuilder: FormBuilder,
              private servicioPersona : PersonaService) 
  { }

  ngOnInit ():void {
    this.servicioPersona.obtenerPersonas().subscribe(data=> {
      this.persona=data[0];  
      this.formularioContacto = this.formBuilder.group({
        id: [''],
        ubicacion: ['',[Validators.required]],
        telefono: ['',[Validators.required, Validators.pattern(this.telefonoPattern)]],
        email: ['',[Validators.required, Validators.email]],
        nombre: ["Julián"],
        apellido: ["Meneses"],
        acerca_de_mi: [{"id":1}],
        banner: [{"id":1}],
        usuario: [{"id":1}]
      })
      this.formularioContacto.patchValue(this.persona);
    })
  }

  resetearForm () {                                                           
    $("#contacto-modal-info").on('hidden.bs.modal',  () => {
      this.formularioContacto.patchValue(this.persona);
      this.formularioInvalido = false; 
           
    }
    ) 
  }

  onSubmit ():void {
    if(this.formularioContacto.invalid) {
    this.formularioInvalido=true     
    } else { 
      this.persona=this.formularioContacto.value;
      this.servicioPersona.editarPersona(this.formularioContacto.value).subscribe(); 
      this.enModificarPersona.emit(this.persona);          
      $("#contacto-modal-info").modal('hide');  
    }
  }

  ocultarMensajeError () {   
    this.formularioInvalido=false
  }
  
}