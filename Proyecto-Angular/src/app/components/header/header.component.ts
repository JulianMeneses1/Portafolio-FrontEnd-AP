import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],  
})

export class HeaderComponent {  
  @ViewChild('navBar') navBar!:ElementRef;   
  faBars = faBars;
  modoEdicion:boolean=false;
  suscripcion?:Subscription;
  

  constructor(private renderer: Renderer2,
    private servicioEdicion: ModoEdicionService) {
      this.suscripcion = this.servicioEdicion.onAlternar().subscribe(
          value => this.modoEdicion = value)
      }   
  
  contraerNav(){
    this.renderer.removeClass(this.navBar.nativeElement,"show")  
    
  }      
  
  alternarEdicion(){
    this.servicioEdicion.alternarEdicion()
  }
}

