import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({ 
    selector: '[appScrollConocimientos]'  // este es el selector con el cual vinculamos esta directiva a un elemento HTML
})
export class ScrollConocimientosDirective {

  constructor() { }  

  // Esta variable toma el valor del scroll en el eje Y antes de dispararse el evento

  ultimoScrollY:number = window.scrollY

  // Con HostBinding lo que hacemos es modificar al elemento vinculado la propiedad opacity, con el valor
  // que tiene la variable opacity, en un principio undefined 
 
  
  @HostBinding('class.skills-bar') ok!:boolean


  // HostListener lo que hace es ejecutar una función al producirse el evento onScroll, 
  // es decir al desplazarse el usuario hacia arriba o abajo en la pantalla

  @HostListener('window:scroll') onScroll (){ 

    if (window.innerWidth >= 1400){    
   
    if (this.ultimoScrollY>460) {
        this.ok = true                  
      } else {
        this.ok = false           
      } 
      this.ultimoScrollY = window.scrollY
    } else if (window.innerWidth >= 1000) {
    if (this.ultimoScrollY>530) {
      this.ok = true   
      } else {
        this.ok = false                  
      } 
      this.ultimoScrollY = window.scrollY
    } else if (window.innerWidth >= 600) {
      if (this.ultimoScrollY>580) {
        this.ok = true 
      } else {
        this.ok = false     
      } 
      this.ultimoScrollY = window.scrollY
    } else if (window.innerWidth < 600) {
      if (this.ultimoScrollY>640) {
        this.ok = true 
      } else {
        this.ok = false     
      } 
      this.ultimoScrollY = window.scrollY
    }
  }
}
