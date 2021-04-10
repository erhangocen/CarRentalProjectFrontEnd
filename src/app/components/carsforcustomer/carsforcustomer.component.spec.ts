import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsforcustomerComponent } from './carsforcustomer.component';

describe('CarsforcustomerComponent', () => {
  let component: CarsforcustomerComponent;
  let fixture: ComponentFixture<CarsforcustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarsforcustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsforcustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
