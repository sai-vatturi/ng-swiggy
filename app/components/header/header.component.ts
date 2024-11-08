import { NgFor, NgIf } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { FavoritesService } from '../../services/favorites.service';
import { LocationService } from '../../services/location.service';

interface Location {
	id: string;
	name: string;
}

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [NgIf, NgFor],
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
	isLoggedIn = false;
	currentUser: any;
	showDropdown = false;
	showMobileMenu = false;
	showLocationDropdown = false;
	currentLocation: string = '';
	locations: Location[] = [
		{ id: 'hyd', name: 'Hyderabad' },
		{ id: 'blr', name: 'Bangalore' },
		{ id: 'mum', name: 'Mumbai' }
	];

	cartItemCount = 0;
	favoritesItemCount = 0;
	private cartSubscription!: Subscription;
	private favoritesSubscription!: Subscription;

	constructor(
		private authService: AuthService,
		private router: Router,
		private locationService: LocationService,
		private cartService: CartService,
		private favoritesService: FavoritesService
	) {
		this.isLoggedIn = this.authService.isLoggedIn();
		this.currentUser = this.authService.getCurrentUser();
	}

	ngOnInit(): void {
		this.locationService.location$.subscribe(location => {
			this.currentLocation = location;
		});

		this.currentLocation = this.locationService.getLocation();

		// Subscribe to cart and favorites item counts
		this.cartSubscription = this.cartService.cartItems$.subscribe(items => {
			this.cartItemCount = items.length;
		});

		this.favoritesSubscription = this.favoritesService.favoriteItems$.subscribe(items => {
			this.favoritesItemCount = items.length;
		});
	}

	ngOnDestroy(): void {
		// Unsubscribe to prevent memory leaks
		this.cartSubscription.unsubscribe();
		this.favoritesSubscription.unsubscribe();
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

	toggleMobileMenu() {
		this.showMobileMenu = !this.showMobileMenu;
		if (!this.showMobileMenu) {
			this.showLocationDropdown = false;
			this.showDropdown = false;
		}
	}

	toggleLocationDropdown() {
		this.showLocationDropdown = !this.showLocationDropdown;
		if (this.showLocationDropdown) {
			this.showDropdown = false;
			this.showMobileMenu = false;
		}
	}

	selectLocation(location: string) {
		this.locationService.setLocation(location);
		this.showLocationDropdown = false;
	}

	logout() {
		this.authService.logout();
		this.isLoggedIn = false;
		this.router.navigate(['/']);
	}

	@HostListener('document:click', ['$event'])
	closeDropdown(event: Event) {
		const target = event.target as HTMLElement;
		if (!target.closest('.relative') && !target.closest('.location-dropdown')) {
			this.showDropdown = false;
			this.showLocationDropdown = false;
		}
	}
}
