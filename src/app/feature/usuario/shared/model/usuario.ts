export class Usuario {
  id: number;
  cedula: string;
  nombre: string;
  fechaCreacion: string;
  fechaNacimiento: string;
  creditos: number;
  cedido: number;

  constructor(
    id: number,
    cedula: string,
    nombre: string,
    fechaCreacion: string,
    fechaNacimiento: string,
    creditos: number,
    cedido: number
  ) {
    this.id = id;
    this.nombre = nombre;
    this.cedula = cedula;
    this.fechaCreacion = fechaCreacion;
    this.fechaNacimiento = fechaNacimiento;
    this.creditos = creditos;
    this.cedido = cedido;
  }
}
