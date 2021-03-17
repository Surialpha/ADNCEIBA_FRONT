import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { UsuarioService } from '@usuario/shared/service/usuario.service';

import { CederCreditosComponent } from './ceder-creditos.component';

describe('CederCreditosComponent', () => {
  let component: CederCreditosComponent;
  let fixture: ComponentFixture<CederCreditosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CederCreditosComponent ],
      providers: [ UsuarioService, HttpService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CederCreditosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
