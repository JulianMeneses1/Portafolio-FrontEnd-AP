import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appScrollExpLaboral]'
})
export class ExplaboralScrollDirective {

  constructor() { }

  // Esta variable toma el valor del scroll en el eje Y antes de dispararse el evento

  ultimoScrollY:number = window.scrollY  

  // Con HostBinding lo que hacemos es modificar al elemento vinculado la propiedad opacity, con el valor
  // que tiene la variable opacity, en un principio undefined 
 
  @HostBinding('class.animacion-seccion') ok!:boolean


  // HostListener lo que hace es ejecutar una función al producirse el evento onScroll, 
  // es decir al desplazarse el usuario hacia arriba o abajo en la pantalla

  @HostListener('window:scroll') onScroll (){
    
    if (window.innerWidth>900){
   
      if (this.ultimoScrollY>1550) {
        this.ok = true           
      } else {
        this.ok = false           
      } 
      this.ultimoScrollY = window.scrollY
    } else {

      if (this.ultimoScrollY>1850) {
        this.ok = true                
      } else {
        this.ok = false           
      } 
      this.ultimoScrollY = window.scrollY
    }
  } 
}










  