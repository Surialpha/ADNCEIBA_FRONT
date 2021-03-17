import { InscripcionService } from './shared/service/inscripcion.service';
import { InscripcionRoutingModule } from './inscripcion-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { InscripcionComponent } from './components/inscripcion/inscripcion.component';
import { ListarInscripcionComponent } from './components/listar-inscripcion/listar-inscripcion.component';
import { CrearInscripcionComponent } from './components/crear-inscripcion/crear-inscripcion.component';



@NgModule({
  declarations: [
    InscripcionComponent,
    ListarInscripcionComponent,
    CrearInscripcionComponent
  ],
  imports: [
    InscripcionRoutingModule,
    SharedModule
  ],
  providers: [InscripcionService]
})
export class InscripcionModule { }
