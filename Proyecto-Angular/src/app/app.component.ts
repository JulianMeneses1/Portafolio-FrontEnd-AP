import { Component, OnInit} from '@angular/core';
import * as AOS from 'aos'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{  
 ngOnInit ():void {
    AOS.init()              // AOS es una librería que permite introducir animaciones de forma sencilla, 
                            // es la que usé para las animaciones de todas las secciones al scrollear hacia abajo. Se ponen con el atributo data-aos.    
  }
}
