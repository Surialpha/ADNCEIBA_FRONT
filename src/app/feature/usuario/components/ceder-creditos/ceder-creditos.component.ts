import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '@usuario/shared/model/usuario';
import { UsuarioService } from '@usuario/shared/service/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

const MENSAJE_CREDITOS_CEDIDOS_EXITOSAMENTE =
  'El usuario ha cedido los creditos de manera exitosa';
const MENSAJE_ALGO_SALIÓ_MAL = 'Algo salió mal, intentelo nuevamente';
const MENSAJE_NO_SE_PUEDE_REALIZAR_LA_OPERACION =
  'No se puede realizar esta operacion a si mismo';
const MENSAJE_SIN_CREDITOS = 'Sin creditos para enviar';
const MENSAJE_NUMEROS_NEGATICOS = 'Evita poner numeros negativos';
const RUTA_LISTAR_USUARIOS = '/usuario/listar';
const VALOR_CERO_CREDITOS = 0;
const POSICION_CERO = 0;
const ID = 'id';
const CREDITOS = 'creditos';
const CEDULA = 'cedula';
const FECHA_NACIMIENTO = 'fechaNacimiento';
const NOMBRE = 'nombre';
const CEDIDO = 'cedido';

@Component({
  selector: 'app-ceder-creditos',
  templateUrl: './ceder-creditos.component.html',
  styleUrls: ['./ceder-creditos.component.css'],
})
export class CederCreditosComponent implements OnInit {
  listaUsuarios: Observable<Usuario[]>;
  usuario: Observable<Usuario[]>;
  cederForm: FormGroup;
  maxCreditos: number;
  constructor(
    private usuarioService: UsuarioService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.listaUsuarios = this.usuarioService.consultar();
    this.getParam();
  }

  private getParam() {
    this.route.queryParams.subscribe((params) => {
      if (params.id !== undefined) {
        this.getData(params.id);
      } else {
        location.replace(RUTA_LISTAR_USUARIOS);
      }
    });
  }

  private getData(id) {
    const user = new Usuario(id, null, null, null, null, null, null);
    this.usuario = this.usuarioService.consultarBy(user);
    this.setData();
  }

  private setData() {
    this.construirFormularioCeder();
    this.usuario.subscribe((data) => {

      this.cederForm.controls[ID].setValue(data[POSICION_CERO].id);
      this.cederForm.controls[CREDITOS].setValue(
        data[POSICION_CERO].creditos
      );

      this.cederForm.controls[CEDULA].setValue(data[POSICION_CERO].cedula);

      this.cederForm.controls[FECHA_NACIMIENTO].setValue(
        data[POSICION_CERO].fechaNacimiento
      );

      this.cederForm.controls[NOMBRE].setValue(data[POSICION_CERO].nombre);
      this.maxCreditos = data[POSICION_CERO].creditos;
    });
  }

  validarSelecionado() {
    if (
      this.cederForm.controls.cedido.value ===
      this.cederForm.controls[ID].value
    ) {
      this.toastr.error(MENSAJE_NO_SE_PUEDE_REALIZAR_LA_OPERACION, '');
      this.cederForm.controls[CEDIDO].setValue('');
    }
  }

  public form_Cre_Act() {
    if (this.cederForm.valid) {
      if (this.cederForm.controls[CREDITOS].value > VALOR_CERO_CREDITOS) {
        this.usuarioService.ceder(this.cederForm.value).subscribe(
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
            this.toastr.success(MENSAJE_CREDITOS_CEDIDOS_EXITOSAMENTE, '');
            this.getParam();
          }
        );
      } else if (
        this.cederForm.controls[CREDITOS].value === VALOR_CERO_CREDITOS
      ) {
        this.toastr.error(MENSAJE_SIN_CREDITOS, '');
      } else {
        this.toastr.error(MENSAJE_NUMEROS_NEGATICOS, '');
      }
    }
  }

  validarFormUsuario(campo) {
    return this.cederForm.controls[campo].errors;
  }

  private construirFormularioCeder() {
    this.cederForm = new FormGroup({
      id: new FormControl('', Validators.required),
      cedido: new FormControl('', Validators.required),
      creditos: new FormControl('', Validators.required),
      cedula: new FormControl(''),
      fechaNacimiento: new FormControl(''),
      nombre: new FormControl(''),
    });
  }
}
