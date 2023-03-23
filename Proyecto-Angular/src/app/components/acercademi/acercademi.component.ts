import { Component, OnInit } from '@angular/core';
import { faSquarePen } from '@fortawesome/free-solid-svg-icons';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-acercademi',
  templateUrl: './acercademi.component.html',
  styleUrls: ['./acercademi.component.css']
})
export class AcercademiComponent implements OnInit{
  modoEdicion:boolean=false;
  faSquarePen=faSquarePen;
  suscripcionAlternarEdicion?:Subscription;
  titulo:string="Sobre mí";
  texto:string="Hola! Soy Julián, full-stack web developer. Empecé a incursionar en el mundo de la programación de forma autodidácta a partir de videos en YouTube, por allá a finales de 2021, \
                y actualmente estoy estudiando la carrera de Desarrollo Web y Aplicaciones Digitales. Me apasiona el diseño y desarrollo de sitios y aplicaciones web dinámicos y creativos. \
                Estoy en búsqueda de nuevos desafíos laborales que pongan a prueba mis conocimientos, y me permitan tanto seguir aprendiendo como seguir creciendo profesionalmente."
                


  constructor(private servicioEdicion : ModoEdicionService) 
  {
    this.suscripcionAlternarEdicion = this.servicioEdicion.onAlternarEdicion().subscribe(
      value => this.modoEdicion = value)
  }

  ngOnInit(): void {    
   
  }
  
  cambiarTitulo (event:string) {
    this.titulo=event
  }

  cambiarTexto (event:string) {
    this.texto=event
  }
  
}
