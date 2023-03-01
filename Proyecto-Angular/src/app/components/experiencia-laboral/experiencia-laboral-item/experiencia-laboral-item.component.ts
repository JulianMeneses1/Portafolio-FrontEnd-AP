import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  modoEdicion:boolean=false;
  suscripcion?:Subscription;
  experiencia:Experiencia = Experiencias[0] 

  constructor(private servicioEdicion : ModoEdicionService,
    private ruta: ActivatedRoute) {
      this.ruta.params.subscribe(params=>{      
      this.experiencia = Experiencias [params['id']-1]
    })   
    this.suscripcion = this.servicioEdicion.onAlternar().subscribe(
      value => this.modoEdicion = value)
  }

}






