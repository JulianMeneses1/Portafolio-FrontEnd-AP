import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],  
})

export class HeaderComponent {  
  @ViewChild('navBar') navBar!:ElementRef;   
  faBars = faBars

  constructor(private renderer: Renderer2) {

  } 
  
  contraerNav(){
    this.renderer.removeClass(this.navBar.nativeElement,"show")  
  }  
}

