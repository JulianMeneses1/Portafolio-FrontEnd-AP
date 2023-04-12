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
import { BannerModalComponent } from './components/banner/banner-modal/banner-modal.component';
import { BannerModalImagenPerfilComponent } from './components/banner/banner-modal-imagen-perfil/banner-modal-imagen-perfil.component';
import { InterceptorService } from './services/interceptor.service';



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
    BannerModalComponent,
    BannerModalImagenPerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule  // Para mandar un mail en la sección contacto, pendiente de configurar
  ],
  providers: [ModoEdicionService,
  { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
