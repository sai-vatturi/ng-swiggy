import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private apiUrl = 'https://6728d0196d5fa4901b6b0a9c.mockapi.io/api/users';

	constructor(private http: HttpClient) {}

	// Register a new user
	register(username: string, password: string): Observable<any> {
		const userData = { username, password };
		return this.http.post(this.apiUrl, userData);
	}

	// Login user and save login state
	login(username: string, password: string): Observable<any> {
		return this.http.get<any[]>(this.apiUrl).pipe(
			map(users => users.find(user => user.username === username && user.password === password)),
			tap(user => {
				if (user) {
					this.setLoggedIn(true); // Set logged-in status
					localStorage.setItem('user', JSON.stringify(user)); // Save user info in local storage
				}
			})
		);
	}

	// Set logged-in status
	private setLoggedIn(status: boolean): void {
		localStorage.setItem('isLoggedIn', JSON.stringify(status));
	}

	// Check if the user is logged in
	isLoggedIn(): boolean {
		return JSON.parse(localStorage.getItem('isLoggedIn') || 'false');
	}

	// Get the current user's information
	getCurrentUser() {
		return JSON.parse(localStorage.getItem('user') || 'null');
	}

	// Logout user and clear login state
	logout(): void {
		this.setLoggedIn(false);
		localStorage.removeItem('user');
		localStorage.removeItem('isLoggedIn');
	}
}
