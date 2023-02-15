import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienciaLaboralItemComponent } from './experiencia-laboral-item.component';

describe('ExperienciaLaboralItemComponent', () => {
  let component: ExperienciaLaboralItemComponent;
  let fixture: ComponentFixture<ExperienciaLaboralItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperienciaLaboralItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienciaLaboralItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
