import { Component } from '@angular/core';
import { FoodItemSliderComponent } from '../food-item-slider/food-item-slider.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { RestaurantsSliderComponent } from '../restaurants-slider/restaurants-slider.component';
import { RestaurantsComponent } from '../restaurants/restaurants.component';

@Component({
	selector: 'app-order-selection-page',
	standalone: true,
	imports: [HeaderComponent, FoodItemSliderComponent, RestaurantsComponent, RestaurantsSliderComponent, FooterComponent],
	templateUrl: './order-selection-page.component.html',
	styleUrl: './order-selection-page.component.css'
})
export class OrderSelectionPageComponent {
	title: string = 'Order Selection Page';
}
