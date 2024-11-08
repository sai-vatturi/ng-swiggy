import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { FavoritesService } from '../../services/favorites.service';
import { LocationService } from '../../services/location.service';
import { RestaurantService } from '../../services/restaurant.service';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

interface FoodItem {
	id: string;
	name: string;
	price: number;
	rating: number;
	totalRatings: number;
	veg: boolean;
	quantity: number;
}

@Component({
	selector: 'app-restaurant-detail',
	templateUrl: './restaurant-detail.component.html',
	styleUrls: ['./restaurant-detail.component.css'],
	standalone: true,
	imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent]
})
export class RestaurantDetailComponent implements OnInit {
	restaurant: any;
	location: string = '';
	filteredItems: FoodItem[] = [];
	vegFilter: string = 'all';
	sortOption: 'default' | 'priceAsc' | 'priceDesc' | 'ratingAsc' | 'ratingDesc' = 'default';

	constructor(
		private route: ActivatedRoute,
		private restaurantService: RestaurantService,
		private cartService: CartService,
		private favoritesService: FavoritesService,
		private locationService: LocationService
	) {}

	ngOnInit(): void {
		// Fetch restaurant ID from route parameters
		const restaurantId = this.route.snapshot.paramMap.get('id');
		if (restaurantId) {
			this.loadRestaurantDetails(restaurantId);
		}

		// Subscribe to location updates
		this.locationService.location$.subscribe(location => {
			this.location = location;
		});
	}

	// Load restaurant details and initialize menu items
	private loadRestaurantDetails(restaurantId: string): void {
		this.restaurantService.getRestaurantById(restaurantId).subscribe(
			restaurant => {
				if (restaurant) {
					this.restaurant = restaurant;
					this.restaurant.items.forEach((item: FoodItem) => (item.quantity = 1));
					this.filteredItems = [...this.restaurant.items];
				} else {
					console.error('Restaurant not found');
				}
			},
			error => {
				console.error('Error loading restaurant details:', error);
			}
		);
	}

	// Filter items based on vegetarian status
	filterItems(): void {
		this.filteredItems = this.restaurant.items.filter((item: FoodItem) => {
			if (this.vegFilter === 'veg') return item.veg;
			if (this.vegFilter === 'nonVeg') return !item.veg;
			return true;
		});
		this.sortItems(); // Apply sorting after filtering
	}

	// Sort items based on selected option
	sortItems(): void {
		const sortBy = {
			priceAsc: (a: FoodItem, b: FoodItem) => a.price - b.price,
			priceDesc: (a: FoodItem, b: FoodItem) => b.price - a.price,
			ratingAsc: (a: FoodItem, b: FoodItem) => a.rating - b.rating,
			ratingDesc: (a: FoodItem, b: FoodItem) => b.rating - a.rating
		};

		if (this.sortOption !== 'default') {
			this.filteredItems.sort(sortBy[this.sortOption as keyof typeof sortBy]);
		}
	}

	// Increase item quantity
	incrementQuantity(item: FoodItem): void {
		item.quantity += 1;
	}

	// Decrease item quantity but prevent going below 1
	decrementQuantity(item: FoodItem): void {
		if (item.quantity > 1) {
			item.quantity -= 1;
		}
	}

	// Add item to cart with location validation
	addItemToCart(item: FoodItem): void {
		const initialCartItems = [...this.cartService.getCartItems()];

		// Check if cart already has items from a different restaurant
		if (initialCartItems.length > 0 && initialCartItems[0].restaurantName !== this.restaurant.name) {
			alert(`You can only order from one restaurant at a time. Please clear your cart before adding items from ${this.restaurant.name}.`);
			return;
		}

		const cartItem = {
			itemId: item.id,
			itemName: item.name,
			restaurantName: this.restaurant.name,
			location: this.location,
			price: item.price,
			quantity: item.quantity
		};

		this.cartService.addToCart(cartItem);
		alert(`${item.name} was added to your cart successfully!`);
	}

	// Add item to favorites
	addToFavorites(item: FoodItem): void {
		const favoriteItem = {
			itemId: item.id,
			itemName: item.name,
			restaurantName: this.restaurant.name,
			location: this.location,
			price: item.price,
			quantity: 1
		};

		this.favoritesService.addToFavorites(favoriteItem);
		alert(`${item.name} was added to your favorites!`);
	}
}
