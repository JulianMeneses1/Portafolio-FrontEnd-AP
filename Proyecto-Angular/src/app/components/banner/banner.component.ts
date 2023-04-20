import { Component, OnInit } from '@angular/core';
import { faSquarePen} from '@fortawesome/free-solid-svg-icons';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';
import { BannerService } from 'src/app/services/banner.service';


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
  miBanner:any;

  constructor(private servicioEdicion : ModoEdicionService,
    private servicioBanner: BannerService) {
    this.suscripcionAlternarEdicion = this.servicioEdicion.onAlternarEdicion().subscribe(
      value => this.modoEdicion = value)
  }

  ngOnInit(): void {   
    this.servicioBanner.obtenerDatos().subscribe(data=> {
      console.log("Datos" + JSON.stringify(data));
      this.miBanner=data[0];
    })
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
  


