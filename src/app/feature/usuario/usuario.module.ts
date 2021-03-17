import { NgModule } from '@angular/core';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioService } from './shared/service/usuario.service';
import { SharedModule } from '@shared/shared.module';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ListarUsuarioComponent } from './components/listar-usuario/listar-usuario.component';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { CederCreditosComponent } from './components/ceder-creditos/ceder-creditos.component';


@NgModule({
  declarations: [
  UsuarioComponent,
  ListarUsuarioComponent,
  CrearUsuarioComponent,
  CederCreditosComponent],
  imports: [
    UsuarioRoutingModule,
    SharedModule
  ],
  providers: [UsuarioService]
})
export class UsuarioModule { }
