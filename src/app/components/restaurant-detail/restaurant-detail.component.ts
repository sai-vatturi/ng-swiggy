import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { FavoritesService } from '../../services/favorites.service'; // Import FavoritesService
import { RestaurantService } from '../../services/restaurant.service';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
	selector: 'app-restaurant-detail',
	templateUrl: './restaurant-detail.component.html',
	styleUrls: ['./restaurant-detail.component.css'],
	standalone: true,
	imports: [CommonModule, NgFor, HeaderComponent, FooterComponent, NgIf, NgFor]
})
export class RestaurantDetailComponent implements OnInit {
	restaurant: any;

	constructor(
		private route: ActivatedRoute,
		private restaurantService: RestaurantService,
		private cartService: CartService,
		private favoritesService: FavoritesService // Inject FavoritesService
	) {}

	ngOnInit(): void {
		const restaurantId = this.route.snapshot.paramMap.get('id');
		if (restaurantId) {
			this.restaurantService.getRestaurantById(restaurantId).subscribe(
				restaurant => {
					if (restaurant) {
						this.restaurant = restaurant;
						// Add a quantity property to each menu item
						this.restaurant.items.forEach((item: any) => (item.quantity = 1));
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

	// Increase item quantity
	incrementQuantity(item: any): void {
		item.quantity += 1;
	}

	// Decrease item quantity but prevent going below 1
	decrementQuantity(item: any): void {
		if (item.quantity > 1) {
			item.quantity -= 1;
		}
	}

	// Add item to cart
	addItemToCart(item: any): void {
		const cartItems = this.cartService.getCartItems();

		// Check if there are items from a different restaurant in the cart
		if (cartItems.length > 0 && cartItems[0].restaurantName !== this.restaurant.name) {
			alert(`You can only order from one restaurant at a time. Please clear your cart before adding items from ${this.restaurant.name}.`);
			return;
		}

		const cartItem = {
			itemId: item.id,
			itemName: item.name,
			restaurantName: this.restaurant.name,
			location: this.restaurant.location,
			price: item.price,
			quantity: item.quantity
		};

		this.cartService.addToCart(cartItem);
		alert(`${item.name} was added to your cart successfully!`);
	}

	// Add item to favorites
	addToFavorites(item: any): void {
		const favoriteItem = {
			itemId: item.id,
			itemName: item.name,
			restaurantName: this.restaurant.name,
			location: this.restaurant.location,
			price: item.price,
			quantity: 1 // Default quantity for favorites
		};

		this.favoritesService.addToFavorites(favoriteItem);
		alert(`${item.name} was added to your favorites!`);
	}
}
