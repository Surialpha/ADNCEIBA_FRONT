export class Inscripcion {
  id: number;
  usuario: number;
  curso: number;
  creditos: number;
  fechaInscripcion: string;
  valor: number;
  nombre: string;

  constructor(
    id: number,
    curso: number,
    nombre: string,
    valor: number,
    usuario: number,
    fechaInscripcion: string,
    creditos: number
  ) {
    this.id = id;
    this.usuario = usuario;
    this.curso = curso;
    this.creditos = creditos;
    this.fechaInscripcion = fechaInscripcion;
    this.nombre = nombre;
    this.valor = valor;
  }
}
