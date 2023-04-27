import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormacionAcademicaModalEliminarComponent } from './formacion-academica-modal-eliminar.component';

describe('FormacionAcademicaModalEliminarComponent', () => {
  let component: FormacionAcademicaModalEliminarComponent;
  let fixture: ComponentFixture<FormacionAcademicaModalEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormacionAcademicaModalEliminarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormacionAcademicaModalEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
