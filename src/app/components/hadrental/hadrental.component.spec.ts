import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HadrentalComponent } from './hadrental.component';

describe('HadrentalComponent', () => {
  let component: HadrentalComponent;
  let fixture: ComponentFixture<HadrentalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HadrentalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HadrentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
