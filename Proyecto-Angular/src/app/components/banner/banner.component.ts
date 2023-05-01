import { Component, OnInit } from '@angular/core';
import { faSquarePen} from '@fortawesome/free-solid-svg-icons';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { BannerService } from 'src/app/services/banner.service';
import { Banner } from 'src/app/interfaces/banner';


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})

export class BannerComponent implements OnInit {
  faSquarePen = faSquarePen  
  modoEdicion:boolean=false;
  suscripcionAlternarEdicion?:Subscription;  
  miBanner!:Banner;



  constructor(private servicioEdicion : ModoEdicionService,
    private servicioBanner: BannerService) {
    this.suscripcionAlternarEdicion = this.servicioEdicion.onAlternarEdicion().subscribe(
      value => this.modoEdicion = value)
  }

  ngOnInit(): void {
    
    // GET //

    this.servicioBanner.obtenerBanners().subscribe(data=> {
      this.miBanner=data[0];
    })
  } 
  
  
  // PUT //

  actualizarBanner (event:Banner) {
    this.miBanner=event;
  }

}
  


