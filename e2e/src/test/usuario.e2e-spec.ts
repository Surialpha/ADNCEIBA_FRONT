import { NavbarPage } from "../page/navbar/navbar.po";
import { AppPage } from "../app.po";
import { UsuarioPage } from "../page/usuario/usuario.po";
//import { browser } from "protractor";
//import { protractor } from "protractor/built/ptor";

const CEDULA = "001";
const NOMBRE = "Nombre de prueba";
const FECHA_NACIMIENTO = "01/01/2000";
const FECHA_NACIMIENTO_EXPECT = "2000-01-01";
const NUMERO_CREDITOS = "5";

describe("workspace-project Usuario", () => {
  let page: AppPage;
  let navBar: NavbarPage;
  let usuario: UsuarioPage;

  beforeEach(() => {
    page = new AppPage();
    navBar = new NavbarPage();
    usuario = new UsuarioPage();
  });

  it("Deberia crear usuarios", () => {
    //var EC = protractor.ExpectedConditions;

    page.navigateTo();
    navBar.clickBotonUsuario();
    usuario.clickBotonCrearUsuario();
    usuario.ingresarNombre(NOMBRE);
    usuario.ingresarCedula(CEDULA);
    usuario.ingresarFechaNacimiento(FECHA_NACIMIENTO);
    // Adicionamos las validaciones despues de la creación
    //browser.wait(EC.elementToBeClickable(), 100);
    expect(usuario.getTitiloCrearUsuario()).toEqual("Crear usuario").then(()=>{
      expect(usuario.getNombreUsuario()).toEqual(NOMBRE).then(()=>{
        expect(usuario.getCedulaUsuario()).toEqual(CEDULA).then(()=>{
          expect(usuario.getFechaNacimientoUsuario()).toEqual(FECHA_NACIMIENTO_EXPECT).then(()=>{
            expect(usuario.BotonGuardar.isEnabled()).toBe(true);
          });
        });
      });
    });
  });

  it("Deberia Actualizar usuarios", () => {

    page.navigateTo();
    navBar.clickBotonUsuario();
    usuario.clickBotonActualizarUsuario();
    usuario.ingresarNombre(NOMBRE);
    usuario.ingresarCedula(CEDULA);
    usuario.ingresarFechaNacimiento(FECHA_NACIMIENTO);
    // Adicionamos las validaciones despues de la creación
    expect(usuario.getTitiloCrearUsuario()).toEqual("Actualizar usuario").then(()=>{
      expect(usuario.getNombreUsuario()).toEqual(NOMBRE).then(()=>{
        expect(usuario.getCedulaUsuario()).toEqual(CEDULA).then(()=>{
          expect(usuario.getFechaNacimientoUsuario()).toEqual(FECHA_NACIMIENTO_EXPECT).then(()=>{
            expect(usuario.BotonGuardar.isEnabled()).toBe(true);
          });
        });
      });
    });

  });

  it("Deberia listar usuarios", () => {
    page.navigateTo();
    navBar.clickBotonUsuario();
    usuario.clickBotonListarUsuario();
    expect(usuario.contarUsuarios()).toBeGreaterThanOrEqual(1);
  });

  it("Deberia eliminar usuarios", () => {
    page.navigateTo();
    navBar.clickBotonUsuario();
    usuario.clickBotonEliminarUsuario();
    expect(usuario.BotonEliminarUsuario.isEnabled()).toBe(true);
  });

  it("Deberia ceder creditos usuarios", () => {
    page.navigateTo();
    navBar.clickBotonUsuario();
    usuario.clickBotonCederCreditos();
    usuario.clickSelecionarUsuarioCeder();
    usuario.ingresarCreditosACeder(NUMERO_CREDITOS);
    expect(usuario.getCantidadCreditosCedidos()).toEqual(NUMERO_CREDITOS);
  });


});
