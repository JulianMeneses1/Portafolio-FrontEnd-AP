import { Component, ViewChild, ElementRef, OnInit, Output, EventEmitter} from '@angular/core';
import { faSquarePen, faUser, faEnvelope, faFileLines } from '@fortawesome/free-solid-svg-icons';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-contacto-modal',
  templateUrl: './contacto-modal.component.html',
  styleUrls: ['./contacto-modal.component.css']
})
export class ContactoModalComponent implements OnInit{


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
  formularioContacto!: FormGroup;
  formularioInvalido: boolean = false;


  telefonoPattern:string="([0-9]?\\d{3}-\\d{7})|([+]\\d{2}[ ]\\d{1}[ ][0-9]?\\d{3}-\\d{7})"

  @Output() modificarTitulo: EventEmitter <string> = new EventEmitter ();

  @ViewChild('nuevoTitulo') nuevoTitulo!:ElementRef;
  @ViewChild('ubicacion') ubicacion!:ElementRef;
  @ViewChild('telefono') telefono!:ElementRef;  
  @ViewChild('correo') correo!:ElementRef;  
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
      ubicacion: ['',[Validators.required]],
      telefono: ['',[Validators.required, Validators.pattern(this.telefonoPattern)]],
      correo: ['',[Validators.required, Validators.email]]

    })
  }

  cambiarTitulo() {
    if (this.nuevoTitulo.nativeElement.value!=="") {
      this.titulo=this.nuevoTitulo.nativeElement.value;
      this.modificarTitulo.emit(this.titulo);
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
  onSubmit ():void {
    if(this.formularioContacto.invalid) {
    this.formularioInvalido=true     
    } else {
    this.formularioContacto.reset()    
    this.formularioInvalido=false
    $("#contacto-modal").modal('hide');  
    }
  }
  
    toggleBtnContacto () {
      this.formularioInvalido=false
      this.formularioInvalido=false
    }
  
    ocultarMensajeError () {   
      this.formularioInvalido=false
    }   
  
  

}
