import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingAnimate } from './loading-animate';

describe('LoadingAnimate', () => {
  let component: LoadingAnimate;
  let fixture: ComponentFixture<LoadingAnimate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingAnimate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingAnimate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
