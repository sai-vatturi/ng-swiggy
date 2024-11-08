import { Component } from '@angular/core';
import { FoodItemSliderComponent } from '../food-item-slider/food-item-slider.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
	selector: 'app-categories',
	standalone: true,
	imports: [FoodItemSliderComponent, FooterComponent, HeaderComponent],
	templateUrl: './categories.component.html',
	styleUrl: './categories.component.css'
})
export class CategoriesComponent {}
