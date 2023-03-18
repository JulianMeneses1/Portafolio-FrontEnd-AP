import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit {

  modoEdicion:boolean=false;
  suscripcionAlternarEdicion?:Subscription;
  suscripcionBtnLoggin?:Subscription;
  formularioLogin!: FormGroup;
  formularioInvalido: boolean = false;
  habilitarBotonLogin:boolean = true
  @ViewChild('usuario') usuario!:ElementRef; 
  @ViewChild('contraseña') contraseña!:ElementRef;  

  constructor(private servicioEdicion: ModoEdicionService,
    private formBuilder: FormBuilder) {

      this.suscripcionAlternarEdicion = this.servicioEdicion.onAlternar().subscribe(
        value => this.modoEdicion = value);
        this.suscripcionBtnLoggin = this.servicioEdicion.onAlternarBtnLoggin().subscribe(
          value => this.habilitarBotonLogin = value)
  } 

  ngOnInit ():void {
    this.formularioLogin = this.formBuilder.group({
      usuario: ['',[Validators.required]],
      contraseña: ['',[Validators.required]]
    })
  }

  resetearInputs(){
    this.usuario.nativeElement.value=""
    this.contraseña.nativeElement.value=""
    this.formularioInvalido=false;       
  }

  onSubmit ():void {
    if(this.formularioLogin.invalid) {
    this.habilitarBotonLogin=true
    this.formularioInvalido=true     
    } else {
    this.formularioLogin.reset()    
    this.servicioEdicion.alternarEdicion()
    this.habilitarBotonLogin=false
    }
  }
  
  toggleBtnLoggin () {
    this.habilitarBotonLogin=true;
    this.formularioLogin.reset()
  }

  ocultarMensajeError () {
   
      this.formularioInvalido=false
    } 

}
