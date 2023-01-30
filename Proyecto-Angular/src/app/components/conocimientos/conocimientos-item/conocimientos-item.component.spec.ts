import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConocimientosItemComponent } from './conocimientos-item.component';

describe('ConocimientosItemComponent', () => {
  let component: ConocimientosItemComponent;
  let fixture: ComponentFixture<ConocimientosItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConocimientosItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConocimientosItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
