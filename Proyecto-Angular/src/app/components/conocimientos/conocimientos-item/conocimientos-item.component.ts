import { Component, Input} from '@angular/core';
import { faX, faSquarePen } from '@fortawesome/free-solid-svg-icons';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { Conocimiento } from 'src/app/interfaces/conocimiento';



@Component({
  selector: 'app-conocimientos-item',
  templateUrl: './conocimientos-item.component.html',
  styleUrls: ['./conocimientos-item.component.css']
})
export class ConocimientosItemComponent {  
  faX = faX;
  faSquarePen = faSquarePen;
  modoEdicion:boolean=false;
  suscripcion?:Subscription;  

  @Input() conocimiento!: Conocimiento;

  constructor(private servicioEdicion : ModoEdicionService) 
  {
    this.suscripcion = this.servicioEdicion.onAlternarEdicion().subscribe(
      value => this.modoEdicion = value)
  }
}




