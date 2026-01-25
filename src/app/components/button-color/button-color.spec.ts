import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonColor } from './button-color';

describe('ButtonColor', () => {
  let component: ButtonColor;
  let fixture: ComponentFixture<ButtonColor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonColor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonColor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
