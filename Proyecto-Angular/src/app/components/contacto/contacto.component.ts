import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { faSquarePen, faUser, faUserPen, faEnvelope, faFileLines } from '@fortawesome/free-solid-svg-icons';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


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
  faUserPen = faUserPen;
  faUser = faUser;
  faEnvelop = faEnvelope;
  faFileLines = faFileLines;
  modoEdicion:boolean=false;
  suscripcionAlternarEdicion?:Subscription;
  formularioContacto!: FormGroup;
  formularioInvalido: boolean = false;

  telefonoPattern:string="([0-9]?\\d{3}-\\d{7})|([+]\\d{2}[ ]\\d{1}[ ][0-9]?\\d{3}-\\d{7})"


  @ViewChild('nombreForm') nombreForm!:ElementRef; 
  @ViewChild('correoForm') correoForm!:ElementRef; 
  @ViewChild('mensajeForm') mensajeForm!:ElementRef; 
  @ViewChild('asuntoForm') asuntoForm!:ElementRef; 

  constructor(private servicioEdicion : ModoEdicionService, 
    private formBuilder: FormBuilder) 
  {    
    this.suscripcionAlternarEdicion = this.servicioEdicion.onAlternarEdicion().subscribe(
      value => this.modoEdicion = value)
  }

  ngOnInit ():void {
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

    cambiarTitulo (event:string) {
      this.titulo=event
    }
  

  
  

}
