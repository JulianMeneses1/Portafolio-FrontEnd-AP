import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { Credenciales } from 'src/app/interfaces/credenciales-login';
declare var $: any;    

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit {

  credenciales: Credenciales = {
    usuario: "",
    contraseña: ""
  };
  modoEdicion:boolean=false;
  suscripcionAlternarEdicion?:Subscription;
  formularioLogin!: FormGroup;
  formularioInvalido: boolean = false;
  @ViewChild('usuario') usuario!:ElementRef; 
  @ViewChild('contraseña') contraseña!:ElementRef;  

  constructor(private servicioEdicion: ModoEdicionService,
    private servicioAutenticacion: AutenticacionService,
    private formBuilder: FormBuilder) {

      this.suscripcionAlternarEdicion = this.servicioEdicion.onAlternarEdicion().subscribe(
        value => this.modoEdicion = value)       
  } 

  ngOnInit ():void {
    this.formularioLogin = this.formBuilder.group({
      usuario: ['',[Validators.required]],
      contraseña: ['',[Validators.required]]
    })
  }

  resetearForm () {                                                          
      $("#loginModal").on('hidden.bs.modal',  () => {
      this.formularioLogin.reset();
      this.formularioInvalido = false;      
      }
    ) 
  }

  onSubmit (event:Event):void {
    if(this.formularioLogin.invalid) {
    this.formularioInvalido=true     
    } else {
      this.servicioAutenticacion.iniciarSesion(this.formularioLogin.value).subscribe(response=>{
        this.servicioEdicion.alternarEdicion();
        $("#loginModal").modal('hide')
        })
    }
  }  

  ocultarMensajeError () {   
      this.formularioInvalido=false
    } 

}
