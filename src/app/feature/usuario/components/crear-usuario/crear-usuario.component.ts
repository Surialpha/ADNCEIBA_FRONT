import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '@usuario/shared/model/usuario';
import { UsuarioService } from '@usuario/shared/service/usuario.service';
import { ToastrService } from 'ngx-toastr';

const LONGITUD_MINIMA_PERMITIDA_TEXTO = 3;
const LONGITUD_MAXIMA_PERMITIDA_TEXTO = 50;
const LONGITUD_MINIMA_PERMITIDA_CEDULA = 3;
const LONGITUD_MAXIMA_PERMITIDA_CEDULA = 10;
const ESTADO_ACTUALIZAR = 'Actualizar';
const ESTADO_CREAR = 'Crear';
const MENDAJE_USUARIO_CREADO_CON_EXITO = 'Usuario creado con exito!';
const MENSAJE_USUARIO_ACTUALIZADO_CON_EXITO = 'Usuario actualizado con exito!';
const MENSAJE_ALGO_SALIÓ_MAL = 'Algo salió mal, intentelo nuevamente';
const PATRON_SOLO_VALIDOS_NUMEROS = '[0-9]*';
const PATRON_SOLO_VALIDAS_LETRAS = '[a-zA-Z ]*';
const ID = 'id';
const CEDULA = 'cedula';
const FECHA_NACIMIENTO = 'fechaNacimiento';
const NOMBRE = 'nombre';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css'],
})
export class CrearUsuarioComponent implements OnInit {
  usuarioForm: FormGroup;
  formulario: string;
  maxFecha = Date.now();
  user: Usuario;
  constructor(
    protected usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.construirFormularioUsuario();
    this.getParam();
  }

  getParam() {
    this.route.queryParams.subscribe((params) => {
      if (params.id) {
        this.getUsuario(params.id);
        this.formulario = ESTADO_ACTUALIZAR;
      } else {
        this.formulario = ESTADO_CREAR;
        this.usuarioForm.reset();
      }
    });
  }

  private getUsuario(id) {
    this.user = new Usuario(id, null, null, null, null, null, null);
    this.usuarioService.consultarBy(this.user).subscribe((data) => {
      if (data) {
        this.usuarioForm.controls[ID].setValue(data[0].id);
        this.usuarioForm.controls[NOMBRE].setValue(data[0].nombre);
        this.usuarioForm.controls[CEDULA].setValue(data[0].cedula);
        this.usuarioForm.controls[FECHA_NACIMIENTO].setValue(
          data[0].fechaNacimiento
        );
      }
    });
  }

  form_Cre_Act() {
    if (this.usuarioForm.valid) {
      if (this.formulario === ESTADO_CREAR) {
        this.usuarioService
          .guardar(this.usuarioForm.value)
          .subscribe((data) => {
            if (data) {
              this.toastr.success(MENDAJE_USUARIO_CREADO_CON_EXITO, '');
              this.usuarioForm.reset();
            }
          });
      } else {
        this.usuarioService.actualizar(this.usuarioForm.value).subscribe(
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
            this.toastr.success(MENSAJE_USUARIO_ACTUALIZADO_CON_EXITO, '');
          }
        );
      }
    }
  }

  validarFormUsuario(campo) {
    return this.usuarioForm.controls[campo].errors;
  }

  private construirFormularioUsuario() {
    this.usuarioForm = new FormGroup({
      id: new FormControl(''),
      cedula: new FormControl('', [
        Validators.required,
        Validators.minLength(LONGITUD_MINIMA_PERMITIDA_CEDULA),
        Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_CEDULA),
        Validators.pattern(PATRON_SOLO_VALIDOS_NUMEROS),
      ]),
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO),
        Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO),
        Validators.pattern(PATRON_SOLO_VALIDAS_LETRAS),
      ]),
      fechaNacimiento: new FormControl('', [Validators.required]),
      creditos: new FormControl(''),
    });
  }
}
