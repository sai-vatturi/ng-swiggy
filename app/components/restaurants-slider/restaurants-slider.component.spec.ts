import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantsSliderComponent } from './restaurants-slider.component';

describe('RestaurantsSliderComponent', () => {
  let component: RestaurantsSliderComponent;
  let fixture: ComponentFixture<RestaurantsSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantsSliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestaurantsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
