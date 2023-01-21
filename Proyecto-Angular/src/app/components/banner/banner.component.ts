import { Component, OnInit } from '@angular/core';
import { faSquarePen } from '@fortawesome/free-solid-svg-icons';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  faSquarePen = faSquarePen 
  pantallaGrande:boolean=false; 
  modoEdicion:boolean=false;
  suscripcion?:Subscription

  constructor(private servicioEdicion : ModoEdicionService){
    this.suscripcion = this.servicioEdicion.onAlternar().subscribe(
      value => this.modoEdicion = value)
  }

  ngOnInit(): void {
    
  }

}

