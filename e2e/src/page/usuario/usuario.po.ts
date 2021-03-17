import { by, element } from "protractor";
const ATRUBUTO_VALUE = "value";
export class UsuarioPage {
  private linkCrearUsuario = element(by.id("linkCrearUsuario"));
  private linkListarUsuario = element(by.id("linkListarUsuario"));
  public BotonGuardar = element(by.id("guardarUsuario"));
  private tituloCard = element(by.id("tituloCard"));
  public BotonEliminarUsuario = element(
    by.cssContainingText(".swal2-confirm", "Eliminar")
  );

  private inputCedula = element(by.id("cedula"));
  private inputNombre = element(by.id("nombre"));
  private inputFechaNacimiento = element(by.id("fechaNacimiento"));
  private inputCreditosACeder = element(by.id("creditos"));

  private listaUsuarios = element.all(by.css("#usuarios #bodyTable tr"));

  private linkEliminarUsuario = element(
    by.xpath(
      "/html/body/app-root/app-usuario/app-listar-usuario/div[1]/div[1]/div[1]/div[1]/table/tbody/tr[1]/td[6]/button[2]"
    )
  );
  private linkActualizarUsuario = element(
    by.xpath(
      "/html/body/app-root/app-usuario/app-listar-usuario/div[1]/div[1]/div[1]/div[1]/table/tbody/tr[1]/td[6]/button[1]"
    )
  );
  private linkCederUsuario = element(
    by.xpath(
      "/html/body/app-root/app-usuario/app-listar-usuario/div[1]/div[1]/div[1]/div[1]/table/tbody/tr[1]/td[6]/button[4]"
    )
  );

  private selectUsuarioACeder = element(
    by.css('select[formcontrolname="cedido"]')
  )
    .all(by.tagName("option"))
    .get(1);

  async clickBotonEliminarUsuario() {
    await this.linkEliminarUsuario.click();
  }

  async getCantidadCreditosCedidos() {
    return await this.inputCreditosACeder.getAttribute("value");
  }

  clickSelecionarUsuarioCeder() {
    this.selectUsuarioACeder.click();
  }

  async clickBotonActualizarUsuario() {
    await this.linkActualizarUsuario.click();
  }

  async clickBotonCederCreditos() {
    await this.linkCederUsuario.click();
  }

  async clickBotonCrearUsuario() {
    await this.linkCrearUsuario.click();
  }
  async clickBotonListarUsuario() {
    await this.linkListarUsuario.click();
  }

  ingresarCedula(cedula) {
    this.inputCedula.clear().then(() => {
      this.inputCedula.sendKeys(cedula);
    });
  }

  ingresarCreditosACeder(creditos) {
    this.inputCreditosACeder.clear().then(() => {
      this.inputCreditosACeder.sendKeys(creditos);
    });
  }
  ingresarNombre(nombre) {
    this.inputNombre.clear().then(() => {
      this.inputNombre.sendKeys(nombre);
    });
  }
  ingresarFechaNacimiento(fechaNacimiento) {
    this.inputFechaNacimiento.clear().then(() => {
      this.inputFechaNacimiento.sendKeys(fechaNacimiento);
    });
  }
  async contarUsuarios() {
    return this.listaUsuarios.count();
  }
  getTitiloCrearUsuario() {
    return this.tituloCard.getText();
  }

  getNombreUsuario() {
    return this.inputNombre.getAttribute(ATRUBUTO_VALUE);
  }

  getCedulaUsuario() {
    return this.inputCedula.getAttribute(ATRUBUTO_VALUE);
  }

  getFechaNacimientoUsuario() {
    return this.inputFechaNacimiento.getAttribute(ATRUBUTO_VALUE);
  }
}
