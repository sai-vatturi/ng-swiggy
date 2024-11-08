// favorites.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface FavoriteItem {
	itemId: string;
	itemName: string;
	restaurantName: string;
	location: string;
	price: number;
	quantity: number; // For selecting quantity when adding to cart
}

@Injectable({
	providedIn: 'root'
})
export class FavoritesService {
	private favoriteItems: FavoriteItem[] = [];
	private favoriteItemsSubject = new BehaviorSubject<FavoriteItem[]>([]);
	favoriteItems$ = this.favoriteItemsSubject.asObservable();

	// Add item to favorites with details
	addToFavorites(item: FavoriteItem): void {
		const exists = this.favoriteItems.find(fav => fav.itemId === item.itemId);
		if (!exists) {
			this.favoriteItems.push({ ...item, quantity: 1 });
			this.updateFavorites();
		}
	}

	// Remove item from favorites
	removeFromFavorites(itemId: string): void {
		this.favoriteItems = this.favoriteItems.filter(item => item.itemId !== itemId);
		this.updateFavorites();
	}

	private updateFavorites(): void {
		this.favoriteItemsSubject.next(this.favoriteItems);
	}
}
