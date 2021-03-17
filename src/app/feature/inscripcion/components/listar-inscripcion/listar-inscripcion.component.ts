import { InscripcionService } from '@inscripcion/shared/service/inscripcion.service';
import { Component, OnInit } from '@angular/core';
import { Inscripcion } from '@inscripcion/shared/model/inscripcion';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

const MENSAJE_PREGUNTA_ELIMINAR_INSCRIPCION = 'Deseas eliminar la inscripción?';
const MENSAJE_CONFIRMACION_USUARIO_INSCRIPCION = 'inscripción eliminada!';
const MENSAJE_ALGO_SALIÓ_MAL = 'Algo salió mal, intentelo nuevamente';
const BOTON_ELIMINAR = `Eliminar`;
const BOTON_CANCELAR = `Cancelar`;
const ID_BODY_DEL_DATA_TABLE = 'bodyTable';
const INICIAL_ID_TRS_DEL_DATA_TABLE = 'tr-';
const ICONO_SWEET_ALERT = 'warning';

@Component({
  selector: 'app-listar-inscripcion',
  templateUrl: './listar-inscripcion.component.html',
  styleUrls: ['./listar-inscripcion.component.css'],
})
export class ListarInscripcionComponent implements OnInit {
  ListaInscriociones: Observable<Inscripcion[]>;
  protected inscripcion: Inscripcion;
  private bodyTable: HTMLElement;
  private tr: HTMLElement;
  constructor(
    private inscripcionService: InscripcionService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getParam();
  }

  private getParam() {
    this.route.queryParams.subscribe((params) => {
      if (params.id) {
        this.inscripcion = new Inscripcion(
          params.id,
          null,
          null,
          null,
          null,
          null,
          null
        );
        this.ListaInscriociones = this.inscripcionService.consultarByUser(
          this.inscripcion
        );
      } else {
        this.ListaInscriociones = this.inscripcionService.consultar();
      }
    });
  }

  public eliminar(id) {
    Swal.fire({
      title: MENSAJE_PREGUNTA_ELIMINAR_INSCRIPCION,
      showDenyButton: true,
      icon: ICONO_SWEET_ALERT,
      confirmButtonText: BOTON_ELIMINAR,
      denyButtonText: BOTON_CANCELAR,
    }).then((result) => {
      if (result.isConfirmed) {
        const inscripcion = new Inscripcion(
          id,
          null,
          null,
          null,
          null,
          null,
          null
        );
        this.inscripcionService.eliminar(inscripcion).subscribe(
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
          this.toastr.success(MENSAJE_CONFIRMACION_USUARIO_INSCRIPCION, '');
          this.bodyTable = document.getElementById(ID_BODY_DEL_DATA_TABLE);
          this.tr = document.getElementById(INICIAL_ID_TRS_DEL_DATA_TABLE + id);
          this.bodyTable.removeChild(this.tr);
        });
      }
    });
  }
}
