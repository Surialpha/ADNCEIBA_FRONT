import { NavbarPage } from "../page/navbar/navbar.po";
import { AppPage } from "../app.po";
import { InscripcionPage } from "../page/inscripcion/inscripcion.po";
//import { browser } from 'protractor';
//import { protractor } from 'protractor/built/ptor';

const NOMBRE_CURSO_SELECCIONADO = "Cocina";

describe("workspace-project Inscripcion", () => {
  let page: AppPage;
  let navBar: NavbarPage;
  let inscripcion: InscripcionPage;

  beforeEach(() => {
    page = new AppPage();
    navBar = new NavbarPage();
    inscripcion = new InscripcionPage();
  });

  it("Deberia crear inscripciones", () => {
    page.navigateTo();
    navBar.clickBotonInscripcion();
    inscripcion.clickBotonCrearInscripcion();
    inscripcion.clickSelecionarUsuarioInscripcion();
    inscripcion.clickSelecionarCursoInscripcion();
    // Adicionamos las validaciones despues de la creación
    expect(inscripcion.getNombreCurso())
      .toEqual(NOMBRE_CURSO_SELECCIONADO)
      .then(() => {
        expect(inscripcion.getUsuarioSeleccionado())
          .toBe(true)
          .then(() => {
            expect(inscripcion.verificarBotonGuardar()).toBe(true);
          });
      });
  });

  it("Deberia listar inscripciones", () => {
    page.navigateTo();
    navBar.clickBotonInscripcion();
    inscripcion.clickBotonListarInscripcion();
    expect(inscripcion.contarInscripciones()).toBeGreaterThanOrEqual(1);
  });

  it("Deberia eliminar inscripciones", () => {
    page.navigateTo();
    navBar.clickBotonInscripcion();
    inscripcion.clickBotonListarInscripcion();
    inscripcion.clickEliminarInscripcion();
    expect(inscripcion.verificarBotonEliminar()).toBe(true);
  });

});
