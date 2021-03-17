import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { Inscripcion } from '../model/inscripcion';

@Injectable()
export class InscripcionService {
  constructor(protected http: HttpService) {}

  public consultar() {
    return this.http.doGet<Inscripcion[]>(
      `${environment.endpoint}/inscripcion`,
      this.http.optsName('consultar inscripciones')
    );
  }

  public consultarBy(inscripcion: Inscripcion) {
    return this.http.doGet<Inscripcion[]>(
      `${environment.endpoint}/inscripcion/${inscripcion.id}`,
      this.http.optsName('consultar inscripcion')
    );
  }

  public consultarByUser(inscripcion: Inscripcion) {
    return this.http.doGet<Inscripcion[]>(
      `${environment.endpoint}/inscripcion/usuario/${inscripcion.id}`,
      this.http.optsName('consultar inscripcion por usuario')
    );
  }

  public guardar(inscripcion: Inscripcion) {
    return this.http.doPost<Inscripcion, boolean>(
      `${environment.endpoint}/inscripcion`,
      inscripcion,
      this.http.optsName('crear inscripcion')
    );
  }

  public actualizar(inscripcion: Inscripcion) {
    return this.http.doPut<Inscripcion, boolean>(
      `${environment.endpoint}/inscripcion/${inscripcion.id}`,
      inscripcion,
      this.http.optsName('actualizar inscripcion')
    );
  }

  public eliminar(inscripcion: Inscripcion) {
    return this.http.doDelete<boolean>(
      `${environment.endpoint}/inscripcion/${inscripcion.id}`,
      this.http.optsName('eliminar usuarios')
    );
  }
}
