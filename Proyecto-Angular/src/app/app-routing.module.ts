import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExperienciaLaboralItemComponent } from './components/experiencia-laboral/experiencia-laboral-item/experiencia-laboral-item.component';

const routes: Routes = [
   
  {path:"experiencia", component: ExperienciaLaboralItemComponent, pathMatch: "full"},
  {path:'**', redirectTo:'', pathMatch: "full"}                         // si escriben cualquier cosa después de la url base (localhost:4200/) 
                                                                        // que no se corresponda con una de mis rutas, el usuario es redirigido a la
                                                                        // página principal
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
