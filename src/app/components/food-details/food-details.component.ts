import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service'; // Assume CartService handles cart actions
import { FavoritesService } from '../../services/favorites.service'; // Assume FavoritesService handles favorites actions
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
	location: string = '';
	category: string = '';
	items: any[] = [];

	constructor(
		private route: ActivatedRoute,
		private restaurantService: RestaurantService,
		private locationService: LocationService,
		private cartService: CartService,
		private favoritesService: FavoritesService // Inject FavoritesService
	) {}

	ngOnInit(): void {
		this.route.queryParams.subscribe(params => {
			this.category = params['category'];
			this.loadItems();
		});

		this.locationService.location$.subscribe(location => {
			this.location = location;
		});
	}

	loadItems(): void {
		this.restaurantService.getItemsByCategory(this.category).subscribe(items => {
			// Initialize quantity for each item
			this.items = items.map(item => ({ ...item, quantity: 1 }));
		});
	}

	// Increase item quantity
	incrementQuantity(item: any): void {
		item.quantity += 1;
	}

	// Decrease item quantity but prevent it going below 1
	decrementQuantity(item: any): void {
		if (item.quantity > 1) {
			item.quantity -= 1;
		}
	}

	// Add the item to the cart
	// food-details.component.ts

	// Add the method to check if the item is from the same restaurant
	// food-details.component.ts
	// food-details.component.ts
	// food-details.component.ts
	// food-details.component.ts
	addToCart(item: any): void {
		// Get current cart items before adding
		const initialCartItems = [...this.cartService.getCartItems()];

		// Attempt to add the item to the cart
		this.cartService.addToCart({
			itemId: item.id,
			itemName: item.name,
			restaurantName: item.restaurantName,
			location: this.location,
			price: item.price,
			quantity: item.quantity
		});

		// Get cart items after attempting to add
		const updatedCartItems = this.cartService.getCartItems();

		// Compare cart items before and after to confirm if item was added
		if (updatedCartItems.length > initialCartItems.length) {
			alert(`${item.name} was added to your cart successfully!`);
		}
		// No need for an alert if the item was not added (conflict due to restaurant)
	}

	// Add the item to favorites
	// food-details.component.ts (Add this to the `addToFavorites` method)
	addToFavorites(item: any): void {
		const favoriteItem = {
			itemId: item.id,
			itemName: item.name,
			restaurantName: item.restaurantName,
			location: this.location,
			price: item.price,
			quantity: 1
		};
		this.favoritesService.addToFavorites(favoriteItem);
		alert(`${item.name} was added to your favorites!`);
	}
}
