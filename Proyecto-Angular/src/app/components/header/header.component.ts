import { Component, ElementRef, } from '@angular/core';
import { faBars, faX } from '@fortawesome/free-solid-svg-icons';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
declare var $: any;  


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],  
})

export class HeaderComponent {  
  faBars = faBars;
  faX = faX  
  modoEdicion:boolean=false;
  suscripcion?:Subscription;
  scrollVisible:boolean=true

  

  constructor(private servicioEdicion: ModoEdicionService) {
      this.suscripcion = this.servicioEdicion.onAlternarEdicion().subscribe(
          value => this.modoEdicion = value);    
      } 
      
  cerrarMenuRetardo () {
    if(window.innerHeight>=600) {
      setTimeout(this.cerrarMenu,400)
      } else { setTimeout(this.cerrarMenu, 800)
    } 
  }

  cerrarMenu () {
    $("#menuColapsado").modal('hide')
  }
  
  alternarEdicion(){
    this.servicioEdicion.alternarEdicion()
  } 
}

