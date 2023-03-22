import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormacionAcademicaModalComponent } from './formacion-academica-modal.component';

describe('FormacionAcademicaModalComponent', () => {
  let component: FormacionAcademicaModalComponent;
  let fixture: ComponentFixture<FormacionAcademicaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormacionAcademicaModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormacionAcademicaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
