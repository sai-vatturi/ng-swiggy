import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [FormsModule],
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent {
	username = '';
	password = '';

	constructor(
		private authService: AuthService,
		private router: Router
	) {}

	onRegister() {
		this.authService.register(this.username, this.password).subscribe(
			response => {
				console.log('Registration successful', response);
				alert('Registration successful!');
				this.router.navigate(['/login']);
			},
			error => {
				console.error('Registration failed', error);
				alert('Registration failed. Please try again.');
			}
		);
	}
	navigateToLogin() {
		this.router.navigate(['/login']);
	}
	navigateTo(route: string) {
		this.router.navigate([route]);
	}
}
