import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CartItem {
	itemId: string;
	itemName: string;
	restaurantName: string;
	location: string;
	price: number;
	quantity: number;
}

export interface OrderDetails {
	userId: string;
	username: string;
	items: CartItem[];
	totalPrice: number;
	date: string;
	restaurantName: string;
}

@Injectable({
	providedIn: 'root'
})
export class CartService {
	private cartItems: CartItem[] = [];
	private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
	cartItems$ = this.cartItemsSubject.asObservable();
	private totalPriceSubject = new BehaviorSubject<number>(0);
	totalPrice$ = this.totalPriceSubject.asObservable();
	private currentRestaurantName: string | null = null; // Track current restaurant
	private ordersUrl = 'https://6728d0196d5fa4901b6b0a9c.mockapi.io/api/orders'; // Orders endpoint

	constructor(private http: HttpClient) {} // Inject HttpClient here

	addToCart(item: CartItem): void {
		// Check if the cart contains items from a different restaurant
		if (this.currentRestaurantName && this.currentRestaurantName !== item.restaurantName) {
			alert(`You can only add items from ${this.currentRestaurantName}. Please clear your cart to add items from ${item.restaurantName}.`);
			return;
		}

		// If no items are in the cart, set the current restaurant name
		if (!this.currentRestaurantName) {
			this.currentRestaurantName = item.restaurantName;
		}

		const existingItem = this.cartItems.find(i => i.itemId === item.itemId);

		if (existingItem) {
			existingItem.quantity += item.quantity;
		} else {
			this.cartItems.push({ ...item });
		}

		this.updateCart();
	}

	removeFromCart(itemId: string): void {
		this.cartItems = this.cartItems.filter(item => item.itemId !== itemId);
		if (this.cartItems.length === 0) {
			this.currentRestaurantName = null; // Reset the restaurant name if the cart is empty
		}
		this.updateCart();
	}

	clearCart(): void {
		this.cartItems = [];
		this.currentRestaurantName = null;
		this.updateCart();
		alert('Cart has been cleared.');
	}

	getCartItems(): CartItem[] {
		return this.cartItems;
	}

	private updateCart(): void {
		this.cartItemsSubject.next(this.cartItems);
		this.totalPriceSubject.next(this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0));
	}

	placeOrder(orderDetails: OrderDetails): Observable<any> {
		return this.http.post(this.ordersUrl, orderDetails);
	}
}
