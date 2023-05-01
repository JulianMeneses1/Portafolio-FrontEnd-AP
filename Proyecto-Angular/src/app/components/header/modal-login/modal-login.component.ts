import { Component, OnInit } from '@angular/core';
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
  usuarioIncorrecto:boolean = false;

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
      this.usuarioIncorrecto=false;      
      }
    ) 
  }

  onSubmit ():void {
    if(this.formularioLogin.invalid) {
      this.formularioInvalido=true     
    } else {     
        this.servicioAutenticacion.iniciarSesion(this.formularioLogin.value).subscribe( {
          // next se ejecuta si el observador no tiene errores, en este caso si el usuario es correcto. Si sólo se trabaja con el primer argumento de subscribe, es decir lo que pasa
          // cuando se ejecuta exitosamente el observador, no hace falta poner "next", se puede poner directamente el parámetro o () si no lleva parámetros.
          next: () => {
            this.servicioEdicion.alternarEdicion();
            $("#loginModal").modal('hide')
          // si hay un error se ejecuta lo que está en error
          }, error: () => {
            this.usuarioIncorrecto=true
          }
        }) 
    }
  }  

  ocultarMensajeError () {   
      this.formularioInvalido=false;
      this.usuarioIncorrecto=false;
    } 

}
