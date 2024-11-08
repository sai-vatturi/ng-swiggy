import { NgFor } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocationService } from '../../services/location.service';
import { RestaurantService } from '../../services/restaurant.service';

interface Restaurant {
	id: string;
	name: string;
	rating: number;
	deliveryTime: string;
	priceForTwo: number;
	cuisines: string[];
}

@Component({
	selector: 'app-restaurants-slider',
	templateUrl: './restaurants-slider.component.html',
	styleUrls: ['./restaurants-slider.component.css'],
	standalone: true,
	imports: [NgFor]
})
export class RestaurantsSliderComponent implements OnInit, OnDestroy {
	restaurants: Restaurant[] = [];
	selectedLocation: string = '';
	locationSubscription!: Subscription;
	restaurantSubscription!: Subscription;

	constructor(
		private restaurantService: RestaurantService,
		private locationService: LocationService,
		private router: Router // Inject Router
	) {}

	ngOnInit(): void {
		this.locationSubscription = this.locationService.location$.subscribe(location => {
			this.selectedLocation = location;
			this.loadRestaurants();
		});
		this.loadRestaurants();
	}

	loadRestaurants(): void {
		this.restaurantSubscription = this.restaurantService.getRestaurantsByLocation(this.selectedLocation).subscribe(restaurants => {
			this.restaurants = restaurants;
		});
	}

	ngOnDestroy(): void {
		this.locationSubscription.unsubscribe();
		if (this.restaurantSubscription) {
			this.restaurantSubscription.unsubscribe();
		}
	}

	// Navigate to the restaurant detail page using the provided id
	goToRestaurantDetail(id: string): void {
		this.router.navigate(['/restaurant-detail', id]);
	}
}
