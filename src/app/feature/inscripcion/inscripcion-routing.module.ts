
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearInscripcionComponent } from './components/crear-inscripcion/crear-inscripcion.component';
import { InscripcionComponent } from './components/inscripcion/inscripcion.component';
import { ListarInscripcionComponent } from './components/listar-inscripcion/listar-inscripcion.component';

const routes: Routes = [
  {
    path: '',
    component: InscripcionComponent ,
    children: [
      {
        path: 'listar',
        component: ListarInscripcionComponent
      },
      {
        path: 'crear',
        component: CrearInscripcionComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InscripcionRoutingModule { }
