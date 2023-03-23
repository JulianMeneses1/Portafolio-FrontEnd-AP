import { Component, Input} from '@angular/core';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { Conocimiento } from 'src/app/interfaces/conocimiento';
import { Conocimientos } from 'src/app/interfaces/mosk-conocimientos';


@Component({
  selector: 'app-conocimientos-item',
  templateUrl: './conocimientos-item.component.html',
  styleUrls: ['./conocimientos-item.component.css']
})
export class ConocimientosItemComponent {  
  faX = faX;
  modoEdicion:boolean=false;
  suscripcion?:Subscription;  

  @Input() conocimiento: Conocimiento = Conocimientos[0];

  constructor(private servicioEdicion : ModoEdicionService) 
  {
    this.suscripcion = this.servicioEdicion.onAlternarEdicion().subscribe(
      value => this.modoEdicion = value)
  }

}




