import { Component, ViewChild, ElementRef} from '@angular/core';
import { faSquarePen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { Conocimiento } from 'src/app/interfaces/conocimiento';
import { Conocimientos } from 'src/app/interfaces/mosk-conocimientos';

@Component({
  selector: 'app-conocimientos',
  templateUrl: './conocimientos.component.html',
  styleUrls: ['./conocimientos.component.css']
})
export class ConocimientosComponent {
  titulo:string="Conocimientos";
  faSquarePen = faSquarePen;
  faPlus = faPlus 
  modoEdicion:boolean=false;
  suscripcion?:Subscription;

  @ViewChild('nuevoTitulo') nuevoTitulo!:ElementRef; 

  conocimientos: Conocimiento[] = Conocimientos

  constructor(private servicioEdicion : ModoEdicionService) 
  {
    this.suscripcion = this.servicioEdicion.onAlternar().subscribe(
      value => this.modoEdicion = value)
  }

  cambiarTitulo(){
    if (this.nuevoTitulo.nativeElement.value!=="") {
      this.titulo=this.nuevoTitulo.nativeElement.value;
      this.nuevoTitulo.nativeElement.value=""
    }   
  }

}
