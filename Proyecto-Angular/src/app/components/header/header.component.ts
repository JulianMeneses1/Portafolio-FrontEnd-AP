import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { faBars, faX } from '@fortawesome/free-solid-svg-icons';
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
  faX = faX  
  modoEdicion:boolean=false;
  suscripcion?:Subscription;
  scrollVisible:boolean=true
  

  constructor(private renderer: Renderer2,
    private servicioEdicion: ModoEdicionService) {
      this.suscripcion = this.servicioEdicion.onAlternar().subscribe(
          value => this.modoEdicion = value)
      }   
  
  contraerNav(){
    this.renderer.removeClass(this.navBar.nativeElement,"show");
    this.scrollVisible=true;
    this.renderer.removeClass(document.body, 'scroll-hidden')      
  } 
  
  alternarScrolling(){
    this.scrollVisible=!this.scrollVisible;
    if (!this.scrollVisible) {
      this.renderer.addClass(document.body, 'scroll-hidden')
    } else{
      this.renderer.removeClass(document.body, 'scroll-hidden')
    }

  }
  
  alternarEdicion(){
    this.servicioEdicion.alternarEdicion()
  }
}

