import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBlock } from './product-block';

describe('ProductBlock', () => {
  let component: ProductBlock;
  let fixture: ComponentFixture<ProductBlock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductBlock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductBlock);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
