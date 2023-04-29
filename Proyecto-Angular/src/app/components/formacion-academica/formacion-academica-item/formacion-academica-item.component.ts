import { Component, OnInit, Input} from '@angular/core';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { Formacion } from 'src/app/interfaces/formacion-academica';
import { faX, faSquarePen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-formacion-academica-item',
  templateUrl: './formacion-academica-item.component.html',
  styleUrls: ['./formacion-academica-item.component.css']
})
export class FormacionAcademicaItemComponent implements OnInit {  

  modoEdicion:boolean=true;
  suscripcion?:Subscription;
  faX = faX;
  faSquarePen = faSquarePen;

  @Input() formacion!: Formacion;

  constructor(private servicioEdicion : ModoEdicionService) {
         
    this.suscripcion = this.servicioEdicion.onAlternarEdicion().subscribe(
      value => this.modoEdicion = value)
  }

  ngOnInit () {
   
  }
}






