import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodItemSliderComponent } from './food-item-slider.component';

describe('FoodItemSliderComponent', () => {
  let component: FoodItemSliderComponent;
  let fixture: ComponentFixture<FoodItemSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodItemSliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FoodItemSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
