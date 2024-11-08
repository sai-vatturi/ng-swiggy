import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

declare var Razorpay: any;

@Component({
	selector: 'app-payment',
	standalone: true,
	imports: [NgIf, NgFor],
	templateUrl: './payment.component.html',
	styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
	paymentStatus: string | null = null;
	paymentError: string | null = null;
	totalPriceSubscription: Subscription | null = null;

	constructor(
		private cartService: CartService,
		private authService: AuthService
	) {}

	makePayment() {
		// Subscribe to totalPrice observable to fetch the latest total price
		this.totalPriceSubscription = this.cartService.totalPrice$.subscribe(totalPrice => {
			// If totalPrice is undefined or 0, show an error and exit
			if (totalPrice == null || totalPrice <= 0) {
				this.paymentError = 'Total price is invalid. Please try again.';
				console.error('Invalid total price:', totalPrice);
				return;
			}

			// Set up Razorpay options
			const options = {
				key: 'PIghNTlNKkZDbm', // Replace with your Razorpay Key ID
				amount: totalPrice * 100, // Amount in paise (total price in INR)
				currency: 'INR',
				name: 'Your Company Name',
				description: 'Order Payment',
				handler: this.paymentHandler.bind(this), // Bind to handle successful payment
				prefill: {
					name: this.authService.getCurrentUser()?.username || 'Guest',
					email: 'customer@example.com', // Replace with actual user email if available
					contact: '9876543210' // Replace with actual user contact if available
				},
				theme: {
					color: '#3399cc'
				}
			};

			// Open Razorpay Checkout
			const rzp = new Razorpay(options);
			rzp.on('payment.failed', (response: any) => {
				this.paymentError = response.error.description;
				console.error('Payment failed:', response.error.description);
			});
			rzp.open();
		});
	}

	// Handle successful payment
	paymentHandler(response: any) {
		this.paymentStatus = 'Payment successful! Payment ID: ' + response.razorpay_payment_id;
		console.log('Payment successful:', response);
		this.cartService.clearCart(); // Clear cart after successful payment
		this.paymentError = null; // Reset payment error if previously set
	}

	ngOnDestroy() {
		// Unsubscribe from totalPrice$ to prevent memory leaks
		if (this.totalPriceSubscription) {
			this.totalPriceSubscription.unsubscribe();
		}
	}
}
