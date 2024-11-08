import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocationService } from '../../services/location.service';
import { RestaurantService } from '../../services/restaurant.service';

interface Restaurant {
	id: string;
	name: string;
	rating: number;
	deliveryTime: string; // Change to number if implementing optional fix
	priceForTwo: number;
	cuisines: string[];
}

@Component({
	selector: 'app-restaurants-slider',
	templateUrl: './restaurants-slider.component.html',
	styleUrls: ['./restaurants-slider.component.css'],
	standalone: true,
	imports: [CommonModule]
})
export class RestaurantsSliderComponent implements OnInit, OnDestroy {
	restaurants: Restaurant[] = [];
	selectedLocation: string = '';
	locationSubscription!: Subscription;
	restaurantSubscription!: Subscription;

	constructor(
		private restaurantService: RestaurantService,
		private locationService: LocationService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.locationSubscription = this.locationService.location$.subscribe(location => {
			this.selectedLocation = location;
			this.loadRestaurants();
		});
		// Removed the immediate loadRestaurants call
	}

	loadRestaurants(): void {
		if (this.restaurantSubscription) {
			this.restaurantSubscription.unsubscribe();
		}
		this.restaurantSubscription = this.restaurantService.getRestaurantsByLocation(this.selectedLocation).subscribe({
			next: restaurants => {
				this.restaurants = restaurants;
			},
			error: err => {
				console.error('Error loading restaurants', err);
				// Optionally, set an error message to display in the template
			}
		});
	}

	// Updated sorting method with default handling
	sortRestaurants(criterion: string): void {
		if (criterion.startsWith('rating')) {
			const direction = criterion.endsWith('asc') ? 1 : -1;
			this.restaurants.sort((a, b) => direction * (a.rating - b.rating));
		} else if (criterion.startsWith('deliveryTime')) {
			const direction = criterion.endsWith('asc') ? 1 : -1;
			this.restaurants.sort((a, b) => {
				const timeA = parseInt(a.deliveryTime.split('-')[0], 10);
				const timeB = parseInt(b.deliveryTime.split('-')[0], 10);
				return direction * (timeA - timeB);
			});
		} else {
			// Reload or reset sorting to default
			this.loadRestaurants();
		}
	}

	// Method to handle image load errors
	onImageError(event: Event): void {
		const imgElement = event.target as HTMLImageElement;
		imgElement.src = '/assets/images/placeholder.png';
	}

	ngOnDestroy(): void {
		if (this.locationSubscription) {
			this.locationSubscription.unsubscribe();
		}
		if (this.restaurantSubscription) {
			this.restaurantSubscription.unsubscribe();
		}
	}

	goToRestaurantDetail(id: string): void {
		this.router.navigate(['/restaurant-detail', id]);
	}
}
