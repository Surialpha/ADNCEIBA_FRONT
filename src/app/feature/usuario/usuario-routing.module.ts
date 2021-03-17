
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ListarUsuarioComponent } from './components/listar-usuario/listar-usuario.component';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { CederCreditosComponent } from './components/ceder-creditos/ceder-creditos.component';

const routes: Routes = [
  {
    path: '',
    component: UsuarioComponent ,
    children: [
      {
        path: 'listar',
        component: ListarUsuarioComponent
      },
      {
        path: 'crear',
        component: CrearUsuarioComponent
      },
      {
        path: 'ceder',
        component: CederCreditosComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
