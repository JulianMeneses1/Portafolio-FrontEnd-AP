import { Component, OnInit } from '@angular/core';
import { faSquarePen} from '@fortawesome/free-solid-svg-icons';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})

export class BannerComponent implements OnInit {
  faSquarePen = faSquarePen  
  modoEdicion:boolean=false;
  suscripcionAlternarEdicion?:Subscription;  
  titulo:string = "Julián Meneses";
  subtitulo:string = "Desarrollador Web Full Stack";
  srcBanner:string = "../assets/Banner.jpg";
  srcFotoPerfil:string = "../assets/Foto Perfil.jpg"
  ok:boolean = true

  constructor(private servicioEdicion : ModoEdicionService) {
    this.suscripcionAlternarEdicion = this.servicioEdicion.onAlternarEdicion().subscribe(
      value => this.modoEdicion = value)
  }

  ngOnInit(): void {   
    
  }

  ocultarModal(event:boolean){
    this.ok=event
  }
  cambiarTitulo(event:string){
    this.titulo=event
   
   }
   cambiarSubtitulo(event:string){
    this.subtitulo=event
   
   }
   cambiarBanner(event:string){
    this.srcBanner=event
   
   }

   cambiarFotoPerfil(event:string){
    this.srcFotoPerfil=event
   
   }
  

}
  


