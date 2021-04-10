import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccespaymentComponent } from './succespayment.component';

describe('SuccespaymentComponent', () => {
  let component: SuccespaymentComponent;
  let fixture: ComponentFixture<SuccespaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccespaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccespaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
