import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Experiencia } from 'src/app/interfaces/experiencia-laboral';
import { ExpLaboralService } from 'src/app/services/exp-laboral.service';

@Component({
  selector: 'app-experiencia-laboral-item',
  templateUrl: './experiencia-laboral-item.component.html',
  styleUrls: ['./experiencia-laboral-item.component.css']
})
export class ExperienciaLaboralItemComponent { 
  experiencia!:Experiencia;
  experiencias !: Experiencia[];
 


  constructor(private ruta: ActivatedRoute,
    private servicioExperiencia : ExpLaboralService) {
  } 

  ngOnInit () { 
      
      this.ruta.queryParams.subscribe(params=>{
        this.servicioExperiencia.obtenerExperiencias().subscribe(data => {
          this.experiencias=data;            
          this.experiencia = this.experiencias [params['posicionExp']]
      })
    })  
  }
  
}







