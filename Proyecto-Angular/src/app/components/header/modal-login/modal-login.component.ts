import { IfStmt } from '@angular/compiler';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit {

  pantallaGrande:boolean=false;
 

  ngOnInit(): void {
    if(screen.width>1400){
      this.pantallaGrande=true
    }
  }

}
