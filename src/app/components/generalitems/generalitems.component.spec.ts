import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralitemsComponent } from './generalitems.component';

describe('GeneralitemsComponent', () => {
  let component: GeneralitemsComponent;
  let fixture: ComponentFixture<GeneralitemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralitemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
