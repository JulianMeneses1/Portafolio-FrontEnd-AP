import { Component, OnInit } from '@angular/core';
import { faSquarePen, faUser, faUserPen, faEnvelope, faFileLines } from '@fortawesome/free-solid-svg-icons';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TituloSeccion } from 'src/app/interfaces/titulo-seccion';
import { Persona } from 'src/app/interfaces/persona';
import { TituloSeccionesService } from 'src/app/services/titulo-secciones.service';
import { PersonaService } from 'src/app/services/persona.service';


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit{

  faSquarePen = faSquarePen;
  faUserPen = faUserPen;
  faUser = faUser;
  faEnvelop = faEnvelope;
  faFileLines = faFileLines;
  modoEdicion:boolean=true;
  suscripcionAlternarEdicion?:Subscription;
  formularioContacto!: FormGroup;
  formularioInvalido: boolean = false;
  persona!: Persona;
  titulo!: TituloSeccion

  telefonoPattern:string="([0-9]?\\d{3}-\\d{7})|([+]\\d{2}[ ]\\d{1}[ ][0-9]?\\d{3}-\\d{7})"

  constructor(private servicioEdicion : ModoEdicionService,
              private servicioTituloSeccion : TituloSeccionesService, 
              private formBuilder: FormBuilder,
              private servicioPersona : PersonaService) 
  {    
    this.suscripcionAlternarEdicion = this.servicioEdicion.onAlternarEdicion().subscribe(
      value => this.modoEdicion = value)
  }

  ngOnInit ():void {

    this.servicioTituloSeccion.obtenerTitulos().subscribe(data => {
      this.titulo=data[4]
    });
    this.servicioPersona.obtenerPersonas().subscribe(data => {
      this.persona=data[0]
    })

    this.formularioContacto = this.formBuilder.group({
      nombre: ['',[Validators.required]],
      asunto: ['',[Validators.required]],
      correo: ['',[Validators.required, Validators.email]],
      mensaje: ['',[Validators.required]]

    })  
  }

  onSubmit ():void {
    if(this.formularioContacto.invalid) {
    this.formularioInvalido=true      
    } else {  
    this.formularioContacto.reset()
    }
  }  
  

  ocultarMensajeError () {
   
      this.formularioInvalido=false
    }   

    modificarTitulo (titulo:TituloSeccion) {
      this.titulo=titulo
    }

    modificarPersona (persona : Persona) {
      this.persona=persona
    }
  

}
