import { Component, OnInit} from '@angular/core';
import { ModoEdicionService } from 'src/app/services/modo-edicion.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit {

  modoEdicion:boolean=false;
  suscripcion?:Subscription 

  constructor(private servicioEdicion: ModoEdicionService) {

      this.suscripcion = this.servicioEdicion.onAlternar().subscribe(
        value => this.modoEdicion = value)
  } 

  ngOnInit(): void {
   
  }
  alternarEdicion(){
    this.servicioEdicion.alternarEdicion()
  }

}
