import { Component, OnInit, Input} from '@angular/core';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { Educacion } from 'src/app/interfaces/formacion-academica';
import { FormacionAcademica } from 'src/app/interfaces/mosk-formacion-academica';
import { faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-formacion-academica-item',
  templateUrl: './formacion-academica-item.component.html',
  styleUrls: ['./formacion-academica-item.component.css']
})
export class FormacionAcademicaItemComponent implements OnInit {
   
  @Input() educacion: Educacion = FormacionAcademica[0];
  modoEdicion:boolean=false;
  suscripcion?:Subscription;
  faX = faX;

  constructor(private servicioEdicion : ModoEdicionService) {
         
    this.suscripcion = this.servicioEdicion.onAlternar().subscribe(
      value => this.modoEdicion = value)
  }

  ngOnInit () {
   
  }
}






