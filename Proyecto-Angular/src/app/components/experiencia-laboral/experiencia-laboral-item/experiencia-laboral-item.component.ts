import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { Experiencia } from 'src/app/interfaces/experiencia-laboral';
import { ExpLaboralService } from 'src/app/services/exp-laboral.service';

@Component({
  selector: 'app-experiencia-laboral-item',
  templateUrl: './experiencia-laboral-item.component.html',
  styleUrls: ['./experiencia-laboral-item.component.css']
})
export class ExperienciaLaboralItemComponent { 
  modoEdicion:boolean=false;
  suscripcion?:Subscription;
  experiencia!:Experiencia;
  experiencias !: Experiencia[];
 


  constructor(private servicioEdicion : ModoEdicionService,
    private ruta: ActivatedRoute,
    private servicioExperiencia : ExpLaboralService) {
        
    this.suscripcion = this.servicioEdicion.onAlternarEdicion().subscribe(
      value => this.modoEdicion = value)
  } 

  ngOnInit () {

    this.servicioExperiencia.obtenerExperiencias().subscribe(data => {
      this.experiencias=data;
      this.ruta.queryParams.subscribe(params=>{        
        this.experiencia = this.experiencias [params['idExp']-1]
      })
    })  
  }
  
}







