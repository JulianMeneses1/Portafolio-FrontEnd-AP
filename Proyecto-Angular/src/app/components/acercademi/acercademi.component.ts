import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { faSquarePen } from '@fortawesome/free-solid-svg-icons';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-acercademi',
  templateUrl: './acercademi.component.html',
  styleUrls: ['./acercademi.component.css']
})
export class AcercademiComponent implements OnInit{
  faSquarePen = faSquarePen 
  modoEdicion:boolean=false;
  suscripcion?:Subscription;
  titulo:string="Sobre mí";
  texto:string="Hola! Soy Julián, full-stack web developer. Empecé a incursionar en el mundo de la programación de forma autodidácta a partir de videos en YouTube, por allá a finales de 2021, \
                y actualmente estoy estudiando la carrera de Desarrollo Web y Aplicaciones Digitales. Me apasiona el diseño y desarrollo de sitios y aplicaciones web dinámicos y creativos. \
                Estoy en búsqueda de nuevos desafíos laborales que pongan a prueba mis conocimientos, y me permitan tanto seguir aprendiendo como seguir creciendo profesionalmente."
                
  @ViewChild('nuevoTitulo') nuevoTitulo!:ElementRef; 
  @ViewChild('nuevoTexto') nuevoTexto!:ElementRef;   

  constructor(private servicioEdicion : ModoEdicionService) 
  {
    this.suscripcion = this.servicioEdicion.onAlternar().subscribe(
      value => this.modoEdicion = value)
  }

  ngOnInit(): void {    
   
  } 

  cambiarTexto(){
    if (this.nuevoTitulo.nativeElement.value!=="") {
      this.titulo=this.nuevoTitulo.nativeElement.value;
      this.nuevoTitulo.nativeElement.value=""
    }
    if (this.nuevoTexto.nativeElement.value!=="") {
      this.texto=this.nuevoTexto.nativeElement.value;
      this.nuevoTexto.nativeElement.value=""      
      } 
  }
}
