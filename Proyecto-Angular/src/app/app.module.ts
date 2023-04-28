import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BannerComponent } from './components/banner/banner.component';
import { AcercademiComponent } from './components/acercademi/acercademi.component';
import { ConocimientosComponent } from './components/conocimientos/conocimientos.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { ExperienciaLaboralComponent } from './components/experiencia-laboral/experiencia-laboral.component';
import { FormacionAcademicaComponent } from './components/formacion-academica/formacion-academica.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { FooterComponent } from './components/footer/footer.component';
import { ModalLoginComponent } from './components/header/modal-login/modal-login.component';
import { ModoEdicionService } from './services/modo-edicion.service';
import { ScrollMenuDirective } from './directives/menu-scroll.directive';
import { ScrollConocimientosDirective } from './directives/conocimientos-scroll.directive.ts';
import { ConocimientosItemComponent } from './components/conocimientos/conocimientos-item/conocimientos-item.component';
import { ExperienciaLaboralItemComponent } from './components/experiencia-laboral/experiencia-laboral-item/experiencia-laboral-item.component';
import { ProyectosItemComponent } from './components/proyectos/proyectos-item/proyectos-item.component';
import { FormacionAcademicaItemComponent } from './components/formacion-academica/formacion-academica-item/formacion-academica-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConocimientosModalComponent } from './components/conocimientos/conocimientos-modal/conocimientos-modal.component';
import { ContactoModalComponent } from './components/contacto/contacto-modal/contacto-modal.component';
import { ExperienciaLaboralModalComponent } from './components/experiencia-laboral/experiencia-laboral-modal/experiencia-laboral-modal.component';
import { FormacionAcademicaModalComponent } from './components/formacion-academica/formacion-academica-modal/formacion-academica-modal.component';
import { ProyectosModalComponent } from './components/proyectos/proyectos-modal/proyectos-modal.component';
import { AcercaDeMiModalComponent } from './components/acercademi/acerca-de-mi-modal/acerca-de-mi-modal.component';
import { ConocimientosModalEditarComponent } from './components/conocimientos/conocimientos-modal-editar/conocimientos-modal-editar.component';
import { ProyectosModalEditarComponent } from './components/proyectos/proyectos-modal-editar/proyectos-modal-editar.component';
import { ExperienciaLaboralModalEditarComponent } from './components/experiencia-laboral/experiencia-laboral-modal-editar/experiencia-laboral-modal-editar.component';
import { FormacionAcademicaModalEditarComponent } from './components/formacion-academica/formacion-academica-modal-editar/formacion-academica-modal-editar.component';
import { ConocimientosModalCrearComponent } from './components/conocimientos/conocimientos-modal-crear/conocimientos-modal-crear.component';
import { ProyectosModalCrearComponent } from './components/proyectos/proyectos-modal-crear/proyectos-modal-crear.component';
import { FormacionAcademicaModalCrearComponent } from './components/formacion-academica/formacion-academica-modal-crear/formacion-academica-modal-crear.component';
import { ExperienciaLaboralModalCrearComponent } from './components/experiencia-laboral/experiencia-laboral-modal-crear/experiencia-laboral-modal-crear.component';
import { ContactoModalInfoComponent } from './components/contacto/contacto-modal-info/contacto-modal-info.component';
import { InterceptorService } from './services/interceptor.service';
import { ConocimientosModalEliminarComponent } from './components/conocimientos/conocimientos-modal-eliminar/conocimientos-modal-eliminar.component';
import { ExperienciaLaboralModalEliminarComponent } from './components/experiencia-laboral/experiencia-laboral-modal-eliminar/experiencia-laboral-modal-eliminar.component';
import { FormacionAcademicaModalEliminarComponent } from './componentes/formacion-academica/formacion-academica-modal-eliminar/formacion-academica-modal-eliminar.component';
import { ProyectosModalEliminarComponent } from './components/proyectos/proyectos-modal-eliminar/proyectos-modal-eliminar.component';
import { BannerModalComponent } from './components/banner/banner-modal/banner-modal.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    AcercademiComponent,
    ConocimientosComponent,
    ProyectosComponent,
    ExperienciaLaboralComponent,
    FormacionAcademicaComponent,
    ContactoComponent,
    FooterComponent,
    ModalLoginComponent,
    ScrollMenuDirective,
    ConocimientosItemComponent,
    ScrollConocimientosDirective,
    ExperienciaLaboralItemComponent,
    ProyectosItemComponent,
    FormacionAcademicaItemComponent,
    ConocimientosModalComponent,
    ContactoModalComponent,
    ExperienciaLaboralModalComponent,
    FormacionAcademicaModalComponent,
    ProyectosModalComponent,
    AcercaDeMiModalComponent,
    ConocimientosModalEditarComponent,
    ProyectosModalEditarComponent,
    ExperienciaLaboralModalEditarComponent,
    FormacionAcademicaModalEditarComponent,
    ConocimientosModalCrearComponent,
    ProyectosModalCrearComponent,
    FormacionAcademicaModalCrearComponent,
    ExperienciaLaboralModalCrearComponent,
    ContactoModalInfoComponent,
    ConocimientosModalEliminarComponent,
    ExperienciaLaboralModalEliminarComponent,
    FormacionAcademicaModalEliminarComponent,
    ProyectosModalEliminarComponent,
    BannerModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule  // Para mandar un mail en la sección contacto, pendiente de configurar
  ],
  providers: [ModoEdicionService,
  {
    provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
