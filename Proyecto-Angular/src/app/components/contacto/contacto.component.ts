import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { faSquarePen, faPlus, faUser, faEnvelope, faFileLines } from '@fortawesome/free-solid-svg-icons';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  titulo:string = "¡Espero tu mensaje!";
  telefonoContacto:string = "+ 54 9 351-6565702";
  ubicacionContacto:string = "Córdoba, Argentina";
  correoContacto:string= "julian.meneses11@gmail.com";
  faSquarePen = faSquarePen;
  faPlus = faPlus;
  faUser = faUser;
  faEnvelop = faEnvelope;
  faFileLines = faFileLines;
  modoEdicion:boolean=false;
  suscripcion?:Subscription;
  

  @ViewChild('nuevoTitulo') nuevoTitulo!:ElementRef;
  @ViewChild('ubicacion') ubicacion!:ElementRef;
  @ViewChild('telefono') telefono!:ElementRef;  
  @ViewChild('correo') correo!:ElementRef;  


  constructor(private servicioEdicion : ModoEdicionService,
    private renderer: Renderer2) 
  {    
    this.suscripcion = this.servicioEdicion.onAlternar().subscribe(
      value => this.modoEdicion = value)
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
}
