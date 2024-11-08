import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { FavoritesService } from '../../services/favorites.service';
import { LocationService } from '../../services/location.service';
import { RestaurantService } from '../../services/restaurant.service';
import { FoodItemSliderComponent } from '../food-item-slider/food-item-slider.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
interface FoodItem {
	id: string;
	name: string;
	price: number;
	rating: number;
	veg: boolean;
	quantity: number;
	// Add other properties as necessary
}

@Component({
	selector: 'app-food-details',
	templateUrl: './food-details.component.html',
	styleUrls: ['./food-details.component.css'],
	standalone: true,
	imports: [CommonModule, NgFor, HeaderComponent, FooterComponent, FoodItemSliderComponent, FormsModule]
})
export class FoodDetailsComponent implements OnInit {
	location: string = '';
	category: string = '';
	items: any[] = [];
	filteredItems: any[] = [];
	vegFilter: string = 'all';
	sortOption: 'default' | 'priceAsc' | 'priceDesc' | 'ratingAsc' | 'ratingDesc' = 'default';

	constructor(
		private route: ActivatedRoute,
		private restaurantService: RestaurantService,
		private locationService: LocationService,
		private cartService: CartService,
		private favoritesService: FavoritesService
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
			this.items = items.map(item => ({ ...item, quantity: 1 }));
			this.filterItems(); // Initialize filter on load
		});
	}

	filterItems(): void {
		this.filteredItems = this.items.filter(item => {
			if (this.vegFilter === 'veg') return item.veg;
			if (this.vegFilter === 'nonVeg') return !item.veg;
			return true; // For 'all' filter
		});
		this.sortItems(); // Apply sorting after filtering
	}

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
	addToCart(item: any): void {
		const initialCartItems = [...this.cartService.getCartItems()];
		this.cartService.addToCart({
			itemId: item.id,
			itemName: item.name,
			restaurantName: item.restaurantName,
			location: this.location,
			price: item.price,
			quantity: item.quantity
		});

		const updatedCartItems = this.cartService.getCartItems();
		if (updatedCartItems.length > initialCartItems.length) {
			alert(`${item.name} was added to your cart successfully!`);
		}
	}

	// Add the item to favorites
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
