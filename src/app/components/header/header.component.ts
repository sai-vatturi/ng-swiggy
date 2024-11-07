import { NgFor, NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocationService } from '../../services/location.service'; // Import LocationService

interface Location {
	id: string;
	name: string;
}

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [NgIf, NgFor],
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'] // Corrected to 'styleUrls'
})
export class HeaderComponent {
	isLoggedIn = false;
	currentUser: any;
	showDropdown = false;
	showMobileMenu = false;
	showLocationDropdown = false; // State for location dropdown
	currentLocation: string = '';
	locations: Location[] = [
		{ id: 'hyd', name: 'Hyderabad' },
		{ id: 'blr', name: 'Bangalore' },
		{ id: 'mum', name: 'Mumbai' }
	];

	constructor(
		private authService: AuthService,
		private router: Router,
		private locationService: LocationService // Inject LocationService
	) {
		this.isLoggedIn = this.authService.isLoggedIn();
		this.currentUser = this.authService.getCurrentUser();
		this.currentLocation = this.locationService.getLocation(); // Initialize currentLocation
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
		// Close other dropdowns when mobile menu is toggled
		if (!this.showMobileMenu) {
			this.showLocationDropdown = false;
			this.showDropdown = false;
		}
	}

	toggleLocationDropdown() {
		this.showLocationDropdown = !this.showLocationDropdown;
		// Close other dropdowns when location dropdown is toggled
		if (this.showLocationDropdown) {
			this.showDropdown = false;
			this.showMobileMenu = false;
		}
	}

	selectLocation(location: string) {
		this.locationService.setLocation(location);
		this.currentLocation = location;
		this.showLocationDropdown = false;
	}

	logout() {
		this.authService.logout();
		this.isLoggedIn = false;
		this.router.navigate(['/']);
	}

	// Close the dropdowns if clicked outside
	@HostListener('document:click', ['$event'])
	closeDropdown(event: Event) {
		const target = event.target as HTMLElement;
		if (!target.closest('.relative') && !target.closest('.location-dropdown')) {
			this.showDropdown = false;
			this.showLocationDropdown = false;
		}
	}
}
