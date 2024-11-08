import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { FavoritesService } from '../../services/favorites.service';
import { LocationService } from '../../services/location.service';
import { RestaurantService } from '../../services/restaurant.service';
import { FoodItemSliderComponent } from '../food-item-slider/food-item-slider.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { RestaurantsComponent } from '../restaurants/restaurants.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
	selector: 'app-order-selection-page',
	standalone: true,
	templateUrl: './order-selection-page.component.html',
	styleUrls: ['./order-selection-page.component.css'],
	imports: [NgIf, HeaderComponent, FooterComponent, FoodItemSliderComponent, CommonModule, NgFor, SearchBarComponent, RestaurantsComponent]
})
export class OrderSelectionPageComponent implements OnInit, OnDestroy {
	title: string = 'Order Selection Page';
	searchResults: any[] = [];
	selectedLocation: string = 'Bangalore'; // Default location
	locationSubscription!: Subscription;
	searchCache: Map<string, any[]> = new Map(); // Cache to store results based on location and search term
	searchTerm: string | undefined;

	constructor(
		private route: ActivatedRoute,
		private restaurantService: RestaurantService,
		private locationService: LocationService,
		private cartService: CartService,
		private favoritesService: FavoritesService
	) {}

	ngOnInit() {
		this.locationSubscription = this.locationService.location$.subscribe(location => {
			this.selectedLocation = location;
			console.log('Selected Location Updated:', this.selectedLocation);
			// Update search results based on the new location
			this.updateSearchResults(this.searchTerm || '');
		});
	}

	ngOnDestroy() {
		if (this.locationSubscription) {
			this.locationSubscription.unsubscribe();
		}
	}

	onSearchFood(searchTerm: string) {
		this.searchTerm = searchTerm.trim();
		this.updateSearchResults(this.searchTerm);
	}

	updateSearchResults(searchTerm: string) {
		const cacheKey = `${this.selectedLocation}_${searchTerm}`;

		// Check if cached data exists
		if (this.searchCache.has(cacheKey)) {
			this.searchResults = this.searchCache.get(cacheKey)!;
			console.log('Loaded from cache:', this.searchResults);
		} else if (searchTerm !== '') {
			// Perform a new search if not cached and term is not empty
			this.restaurantService.searchFoodByLocationAndName(this.selectedLocation, searchTerm).subscribe(results => {
				this.searchResults = results.map(item => ({
					...item,
					quantity: item.quantity || 1 // Set default quantity to 1 if not already set
				}));
				// Cache the results
				this.searchCache.set(cacheKey, this.searchResults);
				console.log('Search Results:', this.searchResults);
			});
		} else {
			this.searchResults = []; // Clear if search term is empty
		}
	}

	// Increment and decrement methods remain unchanged
	incrementQuantity(item: any): void {
		item.quantity = typeof item.quantity === 'number' && item.quantity > 0 ? item.quantity + 1 : 1;
	}

	decrementQuantity(item: any): void {
		if (typeof item.quantity === 'number' && item.quantity > 1) {
			item.quantity -= 1;
		} else {
			item.quantity = 1;
		}
	}

	addToCart(item: any): void {
		const initialCartItems = [...this.cartService.getCartItems()];
		this.cartService.addToCart({
			itemId: item.id,
			itemName: item.name,
			restaurantName: item.restaurantName,
			location: this.selectedLocation,
			price: item.price,
			quantity: item.quantity
		});
		const updatedCartItems = this.cartService.getCartItems();

		if (updatedCartItems.length > initialCartItems.length) {
			alert(`${item.name} was added to your cart successfully!`);
		}
	}

	addToFavorites(item: any): void {
		const favoriteItem = {
			itemId: item.id,
			itemName: item.name,
			restaurantName: item.restaurantName,
			location: this.selectedLocation,
			price: item.price,
			quantity: 1
		};
		this.favoritesService.addToFavorites(favoriteItem);
		alert(`${item.name} was added to your favorites!`);
	}
}
