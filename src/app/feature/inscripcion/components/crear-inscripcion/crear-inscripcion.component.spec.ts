import { HttpClient } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '@core/services/http.service';
import { InscripcionService } from '@inscripcion/shared/service/inscripcion.service';
import { ToastrService } from 'ngx-toastr';

import { CrearInscripcionComponent } from './crear-inscripcion.component';

describe('CrearInscripcionComponent', () => {
  let component: CrearInscripcionComponent;
  let fixture: ComponentFixture<CrearInscripcionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearInscripcionComponent ],
      providers: [ InscripcionService, HttpService, HttpClient, ActivatedRoute, ToastrService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearInscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
