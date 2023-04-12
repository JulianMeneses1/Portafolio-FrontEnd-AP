import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
declare var $: any;    

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit {

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
      contraseña: ['',[Validators.required]],
      deviceInfo:this.formBuilder.group({
        deviceId: ["17858567567"],
        deviceType: ["DEVICE_TYPE_ANDROID"],
        notificationToken: ["656466eeecece43"]
      })
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
      event.preventDefault; // esto cancela el curso normal del evento onsubmit del form
      this.servicioAutenticacion.IniciarSesion(this.formularioLogin.value).subscribe(data=>{
        console.log("DATA:" + JSON.stringify(data));
      })
    this.servicioEdicion.alternarEdicion();
    $("#loginModal").modal('hide');  

    }
  }  

  ocultarMensajeError () {   
      this.formularioInvalido=false
    } 

}
