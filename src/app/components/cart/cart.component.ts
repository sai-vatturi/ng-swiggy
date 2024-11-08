import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CartItem, CartService } from '../../services/cart.service';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { PaymentComponent } from '../payment/payment.component';

@Component({
	selector: 'app-cart',
	standalone: true,
	imports: [HeaderComponent, FooterComponent, CommonModule, NgIf, NgFor, PaymentComponent],
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
	cartItems: CartItem[] = [];
	totalPrice = 0;
	loading = false; // New loading state

	constructor(
		private cartService: CartService,
		private authService: AuthService
	) {}

	ngOnInit(): void {
		this.cartService.cartItems$.subscribe(items => {
			this.cartItems = items;
		});
		this.cartService.totalPrice$.subscribe(price => {
			this.totalPrice = price;
		});
	}

	removeItem(itemId: string): void {
		this.cartService.removeFromCart(itemId);
	}

	placeOrder(): void {
		const currentUser = this.authService.getCurrentUser();
		if (!currentUser) {
			alert('Please log in to place an order.');
			return;
		}

		this.loading = true; // Start loading when placing order

		const orderDetails = {
			userId: currentUser.id,
			username: currentUser.username,
			items: this.cartItems,
			totalPrice: this.totalPrice,
			date: new Date().toISOString(),
			restaurantName: this.cartItems[0]?.restaurantName || 'N/A'
		};

		this.cartService.placeOrder(orderDetails).subscribe(
			() => {
				this.loading = false; // Stop loading on success
				alert('Order placed successfully!');
				this.cartService.clearCart();
			},
			error => {
				this.loading = false; // Stop loading on error
				console.error('Order failed', error);
				alert('Failed to place order. Please try again.');
			}
		);
	}
}
