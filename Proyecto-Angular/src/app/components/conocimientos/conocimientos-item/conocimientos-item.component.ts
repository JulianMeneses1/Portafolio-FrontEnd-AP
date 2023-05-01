import { Component, Input, OnInit } from '@angular/core';
import { faX, faSquarePen } from '@fortawesome/free-solid-svg-icons';
import { Conocimiento } from 'src/app/interfaces/conocimiento';


@Component({
  selector: 'app-conocimientos-item',
  templateUrl: './conocimientos-item.component.html',
  styleUrls: ['./conocimientos-item.component.css']
})
export class ConocimientosItemComponent implements OnInit{  
  faX = faX;
  faSquarePen = faSquarePen;

  @Input () modoEdicion!:boolean;
  @Input() conocimiento!: Conocimiento;

  constructor() 
  { }

  ngOnInit(): void {

  }

}




