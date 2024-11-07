import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from '../../services/location.service';
import { RestaurantService } from '../../services/restaurant.service';
import { FoodItemSliderComponent } from '../food-item-slider/food-item-slider.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
	selector: 'app-food-details',
	templateUrl: './food-details.component.html',
	styleUrls: ['./food-details.component.css'],
	standalone: true,
	imports: [CommonModule, NgFor, HeaderComponent, FooterComponent, FoodItemSliderComponent]
})
export class FoodDetailsComponent implements OnInit {
	location: string = ''; // Store the location name
	category: string = ''; // Store the food category
	items: any[] = []; // Array of items in the selected category

	constructor(
		private route: ActivatedRoute,
		private restaurantService: RestaurantService,
		private locationService: LocationService // Inject LocationService
	) {}

	ngOnInit(): void {
		// Subscribe to route query parameters for the category
		this.route.queryParams.subscribe(params => {
			this.category = params['category'];
			this.loadItems();
		});

		// Get the current location from LocationService
		this.locationService.location$.subscribe(location => {
			this.location = location; // Set location to display in the template
		});
	}

	loadItems(): void {
		this.restaurantService.getItemsByCategory(this.category).subscribe(items => {
			this.items = items;
		});
	}
}
