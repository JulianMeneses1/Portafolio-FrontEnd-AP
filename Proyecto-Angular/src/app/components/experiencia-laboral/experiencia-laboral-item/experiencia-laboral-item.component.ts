import { Component, Input} from '@angular/core';
import { faX, faBarsProgress } from '@fortawesome/free-solid-svg-icons';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { Experiencia } from 'src/app/interfaces/experiencia-laboral';
import { Experiencias } from 'src/app/interfaces/mosk-experiencia-laboral';

@Component({
  selector: 'app-experiencia-laboral-item',
  templateUrl: './experiencia-laboral-item.component.html',
  styleUrls: ['./experiencia-laboral-item.component.css']
})
export class ExperienciaLaboralItemComponent {
  faX = faX;  
  modoEdicion:boolean=false;
  suscripcion?:Subscription;
  

  @Input() experiencia: Experiencia = Experiencias[0];

  constructor(private servicioEdicion : ModoEdicionService) 
  {
    this.suscripcion = this.servicioEdicion.onAlternar().subscribe(
      value => this.modoEdicion = value)
  }

}






