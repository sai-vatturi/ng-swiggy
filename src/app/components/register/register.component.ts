import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [FormsModule, NgIf],
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent {
	username = '';
	password = '';
	loading = false; // New loading state

	constructor(
		private authService: AuthService,
		private router: Router
	) {}

	onRegister() {
		this.loading = true; // Start loading
		this.authService.register(this.username, this.password).subscribe(
			response => {
				this.loading = false; // Stop loading on success
				console.log('Registration successful', response);
				alert('Registration successful!');
				this.router.navigate(['/login']);
			},
			error => {
				this.loading = false; // Stop loading on error
				console.error('Registration failed', error);
				alert('Registration failed. Please try again.');
			}
		);
	}

	navigateToLogin() {
		if (!this.loading) {
			// Disable navigation during loading
			this.router.navigate(['/login']);
		}
	}

	navigateTo(route: string) {
		if (!this.loading) {
			// Disable navigation during loading
			this.router.navigate([route]);
		}
	}
}
