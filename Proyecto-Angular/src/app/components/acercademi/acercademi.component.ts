import { Component } from '@angular/core';
import { faSquarePen } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-acercademi',
  templateUrl: './acercademi.component.html',
  styleUrls: ['./acercademi.component.css']
})
export class AcercademiComponent {
  inputEstado:boolean=false
  faSquarePen = faSquarePen 

  activarInput (){     
    this.inputEstado=true    
    };  
}
