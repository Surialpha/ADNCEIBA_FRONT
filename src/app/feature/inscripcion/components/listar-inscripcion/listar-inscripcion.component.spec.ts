import { HttpClient } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { InscripcionService } from '@inscripcion/shared/service/inscripcion.service';

import { ListarInscripcionComponent } from './listar-inscripcion.component';

describe('ListarInscripcionComponent', () => {
  let component: ListarInscripcionComponent;
  let fixture: ComponentFixture<ListarInscripcionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarInscripcionComponent ],
      providers: [ InscripcionService, HttpService, HttpClient]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarInscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
