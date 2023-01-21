import { Component, OnInit} from '@angular/core';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit {

  pantallaGrande:boolean=false; 
  modoEdicion:boolean=false;
  suscripcion?:Subscription 

  constructor(private servicioEdicion: ModoEdicionService) {

      this.suscripcion = this.servicioEdicion.onAlternar().subscribe(
        value => this.modoEdicion = value)
  } 

  ngOnInit(): void {
    if(screen.width>1400){
      this.pantallaGrande=true
    }
  }
  alternarEdicion(){
    this.servicioEdicion.alternarEdicion()
  }

}
