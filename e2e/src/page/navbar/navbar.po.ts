import { by, element } from 'protractor';

export class NavbarPage {
    linkHome = element(by.xpath('/html/body/app-root/app-navbar/nav/a[1]'));
    linkUsuario = element(by.xpath('/html/body/app-root/app-navbar/nav/a[2]'));
    linkInscripcion = element(by.xpath('/html/body/app-root/app-navbar/nav/a[3]'));

    async clickBotonUsuario() {
        await this.linkUsuario.click();
    }

    async clickBotonInscripcion() {
      await this.linkInscripcion.click();
    }

}
