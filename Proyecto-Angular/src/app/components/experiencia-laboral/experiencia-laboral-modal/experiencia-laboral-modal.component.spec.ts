import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienciaLaboralModalComponent } from './experiencia-laboral-modal.component';

describe('ExperienciaLaboralModalComponent', () => {
  let component: ExperienciaLaboralModalComponent;
  let fixture: ComponentFixture<ExperienciaLaboralModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperienciaLaboralModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienciaLaboralModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
