import { NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [NgIf],
	templateUrl: './header.component.html',
	styleUrl: './header.component.css'
})
export class HeaderComponent {
	isLoggedIn = false;
	currentUser: any;
	showDropdown = false;
	showMobileMenu = false;

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

	toggleMobileMenu() {
		this.showMobileMenu = !this.showMobileMenu;
	}

	logout() {
		this.authService.logout();
		this.isLoggedIn = false;
		this.router.navigate(['/']);
	}

	// Close the dropdown if clicked outside
	@HostListener('document:click', ['$event'])
	closeDropdown(event: Event) {
		const target = event.target as HTMLElement;
		if (!target.closest('.relative')) {
			this.showDropdown = false;
		}
	}
}
