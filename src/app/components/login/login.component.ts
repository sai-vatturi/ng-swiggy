import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [FormsModule],
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {
	username = '';
	password = '';

	constructor(
		private authService: AuthService,
		private router: Router
	) {}

	onLogin() {
		this.authService.login(this.username, this.password).subscribe(
			user => {
				if (user) {
					console.log('Login successful', user);
					alert('Login successful!');
					this.router.navigate(['/']);
				} else {
					alert('Invalid credentials. Please try again.');
				}
			},
			error => {
				console.error('Login failed', error);
				alert('Login failed. Please try again.');
			}
		);
	}
}
