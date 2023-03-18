import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { faSquarePen, faUser, faEnvelope, faFileLines } from '@fortawesome/free-solid-svg-icons';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; 


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit{
  titulo:string = "¡Espero tu mensaje!";
  telefonoContacto:string = "+ 54 9 351-6565702";
  ubicacionContacto:string = "Córdoba, Argentina";
  correoContacto:string= "julian.meneses11@gmail.com";
  faSquarePen = faSquarePen;
  faUser = faUser;
  faEnvelop = faEnvelope;
  faFileLines = faFileLines;
  modoEdicion:boolean=false;
  suscripcion?:Subscription;
  formularioContacto!: FormGroup;
  formularioInvalido: boolean = false;
  inputNombre:boolean=false;
  inputAsunto:boolean=false; 
  inputCorreo:boolean=false; 
  inputMensaje:boolean=false;  

  @ViewChild('nuevoTitulo') nuevoTitulo!:ElementRef;
  @ViewChild('ubicacion') ubicacion!:ElementRef;
  @ViewChild('telefono') telefono!:ElementRef;  
  @ViewChild('correo') correo!:ElementRef;  
  @ViewChild('nombreForm') nombreForm!:ElementRef; 
  @ViewChild('correoForm') correoForm!:ElementRef; 
  @ViewChild('mensajeForm') mensajeForm!:ElementRef; 
  @ViewChild('asuntoForm') asuntoForm!:ElementRef; 

  constructor(private servicioEdicion : ModoEdicionService, 
    private fb: FormBuilder, private httpClient: HttpClient) 
  {    
    this.suscripcion = this.servicioEdicion.onAlternar().subscribe(
      value => this.modoEdicion = value)
  }

  ngOnInit ():void {
    this.formularioContacto = this.fb.group({
      nombre: ['',[Validators.required]],
      asunto: ['',[Validators.required]],
      correo: ['',[Validators.required, Validators.email]],
      mensaje: ['',[Validators.required]]

    })
  }

  cambiarTitulo() {
    if (this.nuevoTitulo.nativeElement.value!=="") {
      this.titulo=this.nuevoTitulo.nativeElement.value;
      this.nuevoTitulo.nativeElement.value=""
    }   
  }
  
  resetearTitulo () {
    this.nuevoTitulo.nativeElement.value=""
  }

  resetearInputs() {

    this.ubicacion.nativeElement.value=""
    this.telefono.nativeElement.value=""
    this.correo.nativeElement.value=""   

  }

  onSubmit ():void {
    if(this.formularioContacto.invalid) {
    this.formularioInvalido=true      
    } else {  
    this.nombreForm.nativeElement.value=""
    this.mensajeForm.nativeElement.value=""
    this.correoForm.nativeElement.value=""
    this.asuntoForm.nativeElement.value=""
    this.formularioContacto.reset()
    }
  } 

  ocultarMensajeError () {
   
      this.formularioInvalido=false
    } 
  
  

}
