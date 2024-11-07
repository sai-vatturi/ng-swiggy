import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FooterComponent } from '../footer/footer.component';
import { OfferCardComponent } from './offer-card/offer-card.component';

@Component({
	selector: 'app-homepage',
	standalone: true,
	imports: [CommonModule, OfferCardComponent, FooterComponent],
	templateUrl: './homepage.component.html',
	styleUrl: './homepage.component.css'
})
export class HomepageComponent {
	isLoggedIn = false;
	currentUser: any;
	showDropdown = false;
	offers = [
		{ title: 'RESTAURANTS', subtitle: 'FROM RESTAURANTS', discount: 'UPTO 60% OFF', imageUrl: 'assets/home/1.webp' },
		{ title: 'FOOD ITEMS', subtitle: 'INSTANT DELIVERY', discount: 'UPTO 60% OFF', imageUrl: 'assets/home/2.png' },
		{ title: 'CART', subtitle: 'CHECKOUT', discount: 'ORDERED ITEMS', imageUrl: 'assets/home/3.webp' },
		{ title: 'FAVOURITES', subtitle: 'INSTANT DELIVERY', discount: 'UPTO 60% OFF', imageUrl: 'assets/home/4.webp' }
	];
	constructor(
		private authService: AuthService,
		private router: Router
	) {
		this.isLoggedIn = this.authService.isLoggedIn();
		this.currentUser = this.authService.getCurrentUser();
	}

	navigateTo(path: string) {
		if (this.authService.isLoggedIn()) {
			this.router.navigate([path]);
		} else {
			alert('You need to be logged in to access this page.');
			this.router.navigate(['/login']);
		}
	}

	toggleDropdown() {
		this.showDropdown = !this.showDropdown;
	}

	// Log out the user
	logout() {
		this.authService.logout();
		this.isLoggedIn = false;
		this.router.navigate(['/']);
	}

	// Redirect based on login status
	// In homepage.component.ts
	navigateBasedOnLogin(targetPath: string) {
		if (this.isLoggedIn) {
			this.router.navigate([targetPath]);
		} else {
			this.router.navigate(['/login']);
		}
	}
}
