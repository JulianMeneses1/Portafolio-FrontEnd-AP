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
  suscripcionAlternarEdicion?:Subscription;
  formularioContactoEnviar!: FormGroup;
  formularioInvalidoEnviar: boolean = false;
  suscripcionBtnAceptar?:Subscription;
  formularioContacto!: FormGroup;
  formularioInvalido: boolean = false;
  habilitarBotonContacto:boolean = true

  telefonoPattern:string="([0-9]?\\d{3}-\\d{7})|([+]\\d{2}[ ]\\d{1}[ ][0-9]?\\d{3}-\\d{7})"

  @ViewChild('nuevoTitulo') nuevoTitulo!:ElementRef;
  @ViewChild('ubicacion') ubicacion!:ElementRef;
  @ViewChild('telefono') telefono!:ElementRef;  
  @ViewChild('correo') correo!:ElementRef;  
  @ViewChild('nombreForm') nombreForm!:ElementRef; 
  @ViewChild('correoForm') correoForm!:ElementRef; 
  @ViewChild('mensajeForm') mensajeForm!:ElementRef; 
  @ViewChild('asuntoForm') asuntoForm!:ElementRef; 

  constructor(private servicioEdicion : ModoEdicionService, 
    private formBuilder: FormBuilder, private httpClient: HttpClient) 
  {    
    this.suscripcionAlternarEdicion = this.servicioEdicion.onAlternar().subscribe(
      value => this.modoEdicion = value)
  }

  ngOnInit ():void {
    this.formularioContactoEnviar = this.formBuilder.group({
      nombre: ['',[Validators.required]],
      asunto: ['',[Validators.required]],
      correo: ['',[Validators.required, Validators.email]],
      mensaje: ['',[Validators.required]]

    });
    this.formularioContacto = this.formBuilder.group({
      ubicacion: ['',[Validators.required]],
      telefono: ['',[Validators.required, Validators.pattern(this.telefonoPattern)]],
      correo: ['',[Validators.required, Validators.email]]

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
    this.formularioContacto.reset()   

  }

  onSubmitEnviar ():void {
    if(this.formularioContactoEnviar.invalid) {
    this.formularioInvalidoEnviar=true      
    } else {  
    this.nombreForm.nativeElement.value=""
    this.mensajeForm.nativeElement.value=""
    this.correoForm.nativeElement.value=""
    this.asuntoForm.nativeElement.value=""
    this.formularioContactoEnviar.reset()
    }
  }  
  

  ocultarMensajeErrorEnviar () {
   
      this.formularioInvalidoEnviar=false
    } 

    onSubmit ():void {
      if(this.formularioContacto.invalid) {
      this.habilitarBotonContacto=true
      this.formularioInvalido=true     
      } else {
      this.formularioContacto.reset()    
      this.habilitarBotonContacto=false
      }
    }
  
    toggleBtnContacto () {
      this.habilitarBotonContacto=true;
      this.formularioInvalido=false
    }
  
    ocultarMensajeError () {   
      this.formularioInvalido=false
    }   
  
  

}
