import { Component, ViewChild, ElementRef, OnInit, Output, EventEmitter} from '@angular/core';
import { faSquarePen, faUser, faEnvelope, faFileLines } from '@fortawesome/free-solid-svg-icons';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-contacto-modal-info',
  templateUrl: './contacto-modal-info.component.html',
  styleUrls: ['./contacto-modal-info.component.css']
})
export class ContactoModalInfoComponent implements OnInit{

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


  telefonoPattern:string="([0-9]?\\d{3}-\\d{7})|([+][\\s]?\\d{2}[ ]\\d{1}[ ][0-9]?\\d{3}-\\d{7})"

  @ViewChild('ubicacion') ubicacion!:ElementRef;
  @ViewChild('telefono') telefono!:ElementRef;  
  @ViewChild('correo') correo!:ElementRef;  


  constructor(private servicioEdicion : ModoEdicionService, 
    private formBuilder: FormBuilder) 
  {    
    this.suscripcionAlternarEdicion = this.servicioEdicion.onAlternarEdicion().subscribe(
      value => this.modoEdicion = value)
  }

  ngOnInit ():void {
    
    this.formularioContacto = this.formBuilder.group({
      ubicacion: [this.ubicacionContacto,[Validators.required]],
      telefono: [this.telefonoContacto,[Validators.required, Validators.pattern(this.telefonoPattern)]],
      correo: [this.correoContacto,[Validators.required, Validators.email]]

    })
  }

  onSubmit ():void {
    if(this.formularioContacto.invalid) {
    this.formularioInvalido=true     
    } else {
      this.formularioContacto.reset();    
      this.formularioInvalido=false;
      this.formularioContacto.get('ubicacion')?.setValue(this.ubicacionContacto);
      this.formularioContacto.get('telefono')?.setValue(this.telefonoContacto);
      this.formularioContacto.get('correo')?.setValue(this.correoContacto);     
      $("#contacto-modal-info").modal('hide');  
    }
  }


  
  resetearForm () {                                                           
    $("#contacto-modal-info").on('hidden.bs.modal',  () => {
      this.formularioContacto.reset();
      this.formularioInvalido = false;
      this.formularioContacto.get('ubicacion')?.setValue(this.ubicacionContacto);
      this.formularioContacto.get('telefono')?.setValue(this.telefonoContacto);
      this.formularioContacto.get('correo')?.setValue(this.correoContacto);  
           
    }
    ) 
  }

  ocultarMensajeError () {   
    this.formularioInvalido=false
  }
  
}