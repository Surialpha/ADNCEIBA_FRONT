import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InscripcionService } from '@inscripcion/shared/service/inscripcion.service';
import { Usuario } from '@usuario/shared/model/usuario';
import { UsuarioService } from '@usuario/shared/service/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

const MENSAJE_ACTIALIZACION_INSCRIPCION_EXITOSA =
  'Se ha actualizado la inscripción con exito!';
const MENSAJE_ALGO_SALIÓ_MAL = 'Algo salió mal, intentelo nuevamente';
const MENSAJE_INSCRIPCION_EXITOSA = 'Se ha inscrito con exito!';
const ESTADO_ACTUALIZAR = 'Actualizar';
const ESTADO_CREAR = 'Crear';
const VALOR_CURSO_1 = '100';
const VALOR_CURSO_2 = '50';
const VALOR_CURSO_3 = '80';
const CURSO_1 = '1';
const CURSO_2 = '2';
const CURSO_3 = '3';
const FECHA_DEFAULT = '2021-01-01';
const VALOR = 'valor';

@Component({
  selector: 'app-crear-inscripcion',
  templateUrl: './crear-inscripcion.component.html',
  styleUrls: ['./crear-inscripcion.component.css'],
})
export class CrearInscripcionComponent implements OnInit {
  public inscripcionForm: FormGroup;
  public formulario: string;
  public listaUsuarios: Observable<Usuario[]>;
  constructor(
    private inscripcionService: InscripcionService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    protected usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.construirFormularioInscripcion();
    this.getParam();
    this.listaUsuarios = this.usuarioService.consultar();
  }

  private getParam() {
    this.route.queryParams.subscribe((params) => {
      if (params.id) {
        this.formulario = ESTADO_ACTUALIZAR;
      } else {
        this.formulario = ESTADO_CREAR;
      }
    });
  }

  public setValor() {
    if (this.inscripcionForm.controls.curso.value === CURSO_1) {

      this.inscripcionForm.controls[VALOR].setValue(VALOR_CURSO_1);
    } else if (this.inscripcionForm.controls.curso.value === CURSO_2) {
      this.inscripcionForm.controls[VALOR].setValue(VALOR_CURSO_2);
    } else if (this.inscripcionForm.controls.curso.value === CURSO_3) {
      this.inscripcionForm.controls[VALOR].setValue(VALOR_CURSO_3);
    }
  }

  public form_Cre_Act() {
    if (this.inscripcionForm.valid) {
      if (this.formulario === ESTADO_CREAR) {
        this.inscripcionService
          .guardar(this.inscripcionForm.value)
          .subscribe((data) => {
            if (data) {
              this.toastr.success(MENSAJE_INSCRIPCION_EXITOSA, '');
              this.inscripcionForm.reset();
            }
          });
      } else {
        this.inscripcionService
          .actualizar(this.inscripcionForm.value)
          .subscribe(
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
            this.toastr.success(MENSAJE_ACTIALIZACION_INSCRIPCION_EXITOSA, '');
          });
      }
    }
  }

  private construirFormularioInscripcion() {
    this.inscripcionForm = new FormGroup({
      id: new FormControl(''),
      usuario: new FormControl('', Validators.required),
      curso: new FormControl(CURSO_1, Validators.required),
      valor: new FormControl(VALOR_CURSO_1),
      fechaInscripcion: new FormControl(FECHA_DEFAULT),
    });
  }
}
