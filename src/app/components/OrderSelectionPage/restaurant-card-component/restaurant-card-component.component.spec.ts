import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantCardComponentComponent } from './restaurant-card-component.component';

describe('RestaurantCardComponentComponent', () => {
  let component: RestaurantCardComponentComponent;
  let fixture: ComponentFixture<RestaurantCardComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantCardComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestaurantCardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
