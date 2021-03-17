import { by, element } from "protractor";

export class InscripcionPage {
  private linkCrearInscripcion = element(by.id("linkCrearInscripcion"));
  private linkListarInscripcion = element(by.id("linkListarInscripcion"));
  private botonGuardarIscripcion = element(by.id("guardarInscripcion"));

  private linkEliminarInscripcion = element(
    by.xpath(
      "/html/body/app-root/app-inscripcion/app-listar-inscripcion/div/div/div/div/table/tbody/tr[1]/td[7]/button"
    )
  );
  private BotonEliminarInscripcion = element(
    by.cssContainingText(".swal2-confirm", "Eliminar")
  );

  private selectUsuarioInscripcion = element(
    by.css('select[formControlName="usuario"]')
  )
    .all(by.tagName("option"))
    .get(0);

  private selectCursoInscripcion = element(
    by.css('select[formControlName="curso"]')
  )
    .all(by.tagName("option"))
    .get(1);

  private listaInscripciones = element.all(
    by.css("#inscripciones #bodyTable tr")
  );

  async clickBotonCrearInscripcion() {
    await this.linkCrearInscripcion.click();
  }

  clickEliminarInscripcion() {
    this.linkEliminarInscripcion.click();
  }

  async clickBotonListarInscripcion() {
    await this.linkListarInscripcion.click();
  }

  clickSelecionarUsuarioInscripcion() {
    this.selectUsuarioInscripcion.click();
  }

  clickSelecionarCursoInscripcion() {
    this.selectCursoInscripcion.click();
  }

  contarInscripciones() {
    return this.listaInscripciones.count();
  }

  getNombreCurso() {
    return this.selectCursoInscripcion.getText();
  }

  getUsuarioSeleccionado() {
    return this.selectUsuarioInscripcion.isPresent();
  }

  verificarBotonGuardar() {
    return this.botonGuardarIscripcion.isEnabled();
  }

  verificarBotonEliminar() {
    return this.BotonEliminarInscripcion.isEnabled();
  }
}
