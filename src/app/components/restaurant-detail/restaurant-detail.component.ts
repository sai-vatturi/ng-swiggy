import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../../services/restaurant.service';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
	selector: 'app-restaurant-detail',
	templateUrl: './restaurant-detail.component.html',
	styleUrls: ['./restaurant-detail.component.css'],
	standalone: true,
	imports: [CommonModule, NgFor, HeaderComponent, FooterComponent]
})
export class RestaurantDetailComponent implements OnInit {
	restaurant: any;

	constructor(
		private route: ActivatedRoute,
		private restaurantService: RestaurantService
	) {}

	ngOnInit(): void {
		const restaurantId = this.route.snapshot.paramMap.get('id');
		if (restaurantId) {
			this.restaurantService.getRestaurantById(restaurantId).subscribe(
				restaurant => {
					if (restaurant) {
						this.restaurant = restaurant;
						console.log('Restaurant Details:', restaurant); // Log full details to console
					} else {
						console.error('Restaurant not found');
					}
				},
				error => {
					console.error('Error loading restaurant details:', error);
				}
			);
		} else {
			console.error('No restaurant ID provided');
		}
	}
}
