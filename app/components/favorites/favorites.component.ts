// favorites.component.ts
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { FavoritesService } from '../../services/favorites.service';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

interface FavoriteItem {
	itemId: string;
	itemName: string;
	restaurantName: string;
	location: string;
	price: number;
	quantity: number;
}

@Component({
	selector: 'app-favorites',
	standalone: true,
	imports: [HeaderComponent, FooterComponent, CommonModule, NgIf, NgFor],
	templateUrl: './favorites.component.html',
	styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
	favoriteItems: FavoriteItem[] = [];

	constructor(
		private favoritesService: FavoritesService,
		private cartService: CartService
	) {}

	ngOnInit(): void {
		this.favoritesService.favoriteItems$.subscribe(items => {
			this.favoriteItems = items;
		});
	}

	// Increment quantity
	incrementQuantity(item: FavoriteItem): void {
		item.quantity += 1;
	}

	// Decrement quantity
	decrementQuantity(item: FavoriteItem): void {
		if (item.quantity > 1) {
			item.quantity -= 1;
		}
	}

	// Add item to cart
	addToCart(item: FavoriteItem): void {
		// Capture the number of items before attempting to add
		const initialCartSize = this.cartService.getCartItems().length;

		this.cartService.addToCart({
			itemId: item.itemId,
			itemName: item.itemName,
			restaurantName: item.restaurantName,
			location: item.location,
			price: item.price,
			quantity: item.quantity
		});

		// Check if the cart size has increased
		const cartSizeAfterAddition = this.cartService.getCartItems().length;
		if (cartSizeAfterAddition > initialCartSize) {
			alert(`${item.itemName} was added to your cart successfully!`);
		}
	}

	// Remove item from favorites
	removeFromFavorites(itemId: string): void {
		this.favoritesService.removeFromFavorites(itemId);
		alert('Item removed from favorites.');
	}
}
