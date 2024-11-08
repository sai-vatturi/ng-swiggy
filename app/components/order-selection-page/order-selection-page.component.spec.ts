import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSelectionPageComponent } from './order-selection-page.component';

describe('OrderSelectionPageComponent', () => {
  let component: OrderSelectionPageComponent;
  let fixture: ComponentFixture<OrderSelectionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderSelectionPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderSelectionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
