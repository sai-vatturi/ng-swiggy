import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [FormsModule, NgIf],
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {
	username = '';
	password = '';
	loading = false; // New loading state

	constructor(
		private authService: AuthService,
		private router: Router
	) {}

	onLogin() {
		this.loading = true; // Set loading to true when starting the login process
		this.authService.login(this.username, this.password).subscribe(
			user => {
				this.loading = false; // Stop loading on success
				if (user) {
					console.log('Login successful', user);
					alert('Login successful!');
					this.router.navigate(['/']);
				} else {
					alert('Invalid credentials. Please try again.');
				}
			},
			error => {
				this.loading = false; // Stop loading on error
				console.error('Login failed', error);
				alert('Login failed. Please try again.');
			}
		);
	}

	navigateToRegister() {
		if (!this.loading) {
			// Disable navigation during loading
			this.router.navigate(['/register']);
		}
	}

	navigateTo(route: string) {
		if (!this.loading) {
			// Disable navigation during loading
			this.router.navigate([route]);
		}
	}
}
