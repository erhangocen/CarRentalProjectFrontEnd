import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewrentalComponent } from './newrental.component';

describe('NewrentalComponent', () => {
  let component: NewrentalComponent;
  let fixture: ComponentFixture<NewrentalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewrentalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewrentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
