import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConocimientosModalComponent } from './conocimientos-modal.component';

describe('ConocimientosModalComponent', () => {
  let component: ConocimientosModalComponent;
  let fixture: ComponentFixture<ConocimientosModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConocimientosModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConocimientosModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
