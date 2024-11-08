import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartItem, CartService } from '../../services/cart.service';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
	selector: 'app-cart',
	standalone: true,
	imports: [HeaderComponent, FooterComponent, CommonModule, NgIf, NgFor],
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
	cartItems: CartItem[] = [];
	totalPrice = 0;

	constructor(private cartService: CartService) {}

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
}
