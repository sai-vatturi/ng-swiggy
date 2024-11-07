import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class LocationService {
	private readonly locationKey = 'userLocation';
	private defaultLocation = 'Bangalore';

	constructor() {}

	// Set the location chosen by the user
	setLocation(location: string): void {
		localStorage.setItem(this.locationKey, location);
	}

	// Retrieve the current location of the user
	getLocation(): string {
		return localStorage.getItem(this.locationKey) || this.defaultLocation;
	}

	// Clear the stored location (optional, in case needed)
	clearLocation(): void {
		localStorage.removeItem(this.locationKey);
	}
}
