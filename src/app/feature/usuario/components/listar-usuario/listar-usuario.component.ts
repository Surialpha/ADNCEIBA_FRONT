import { UsuarioService } from '@usuario/shared/service/usuario.service';
import { Observable } from 'rxjs';
import { Usuario } from '@usuario/shared/model/usuario';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

const MENSAJE_PREGUNTA_ELIMINAR_USUARIO = 'Deseas eliminar el usuario?';
const MENSAJE_CONFIRMACION_USUARIO_ELIMINADO = 'usuarios eliminado!';
const MENSAJE_ALGO_SALIÓ_MAL = 'Algo salió mal, intentelo nuevamente';
const BOTON_ELIMINAR = `Eliminar`;
const BOTON_CANCELAR = `Cancelar`;
const ID_BODY_DEL_DATA_TABLE = 'bodyTable';
const INICIAL_ID_TRS_DEL_DATA_TABLE = 'tr-';
const ICONO_SWEET_ALERT = 'warning';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css'],
})
export class ListarUsuarioComponent implements OnInit {
  public listaUsuarios: Observable<Usuario[]>;
  constructor(
    protected usuarioService: UsuarioService,
    private toastr: ToastrService
  ) {}
  bodyTable: HTMLElement;
  tr: HTMLElement;
  ngOnInit(): void {
    this.listaUsuarios = this.usuarioService.consultar();
  }
  eliminar(id) {
    Swal.fire({
      title: MENSAJE_PREGUNTA_ELIMINAR_USUARIO,
      showDenyButton: true,
      icon: ICONO_SWEET_ALERT,
      confirmButtonText: BOTON_ELIMINAR,
      denyButtonText: BOTON_CANCELAR,
    }).then((result) => {
      if (result.isConfirmed) {
        const usuario = new Usuario(id, null, null, null, null, null, null);
        this.usuarioService.eliminar(usuario).subscribe(
          (next) => {
            console.log(next);
          },
          (error) => {
            console.log(error);
            try {
              this.toastr.error(error.error.mensaje, '');
            } catch (error) {
              this.toastr.error(MENSAJE_ALGO_SALIÓ_MAL, '');
            }
          },
          () => {
            this.toastr.success(MENSAJE_CONFIRMACION_USUARIO_ELIMINADO, '');
            this.bodyTable = document.getElementById(ID_BODY_DEL_DATA_TABLE);
            this.tr = document.getElementById(
              INICIAL_ID_TRS_DEL_DATA_TABLE + id
            );
            this.bodyTable.removeChild(this.tr);
          }
        );
        //
      }
    });
  }
}
