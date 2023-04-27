import { Component, OnInit } from '@angular/core';
import { faSquarePen } from '@fortawesome/free-solid-svg-icons';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { AcercaDeMi } from 'src/app/interfaces/acerca-de-mi';
import { AcercaDeMiService } from 'src/app/services/acerca-de-mi.service';

@Component({
  selector: 'app-acercademi',
  templateUrl: './acercademi.component.html',
  styleUrls: ['./acercademi.component.css']
})
export class AcercademiComponent implements OnInit{
  modoEdicion:boolean=true;
  faSquarePen=faSquarePen;
  suscripcionAlternarEdicion?:Subscription;
  miAcercaDeMi!: AcercaDeMi;

              
  constructor(private servicioEdicion : ModoEdicionService,
    private servicioAcercaDeMi : AcercaDeMiService) 
  {
    this.suscripcionAlternarEdicion = this.servicioEdicion.onAlternarEdicion().subscribe(
      value => this.modoEdicion = value)
  }

  ngOnInit(): void {
    
    // GET //

    this.servicioAcercaDeMi.obtenerAcercaDeMi().subscribe(data=> {
      this.miAcercaDeMi=data[0];
    })
  } 
  
  
  // PUT //

  actualizarAcercaDeMi (event:AcercaDeMi) {
    this.miAcercaDeMi=event;
  }
}
