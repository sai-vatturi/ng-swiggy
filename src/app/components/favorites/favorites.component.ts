import { Component } from '@angular/core';
import { FoodItemSliderComponent } from '../food-item-slider/food-item-slider.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
	selector: 'app-favorites',
	standalone: true,
	imports: [HeaderComponent, FoodItemSliderComponent, FooterComponent],
	templateUrl: './favorites.component.html',
	styleUrl: './favorites.component.css'
})
export class FavoritesComponent {}
