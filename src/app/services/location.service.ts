import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class LocationService {
	private readonly locationKey = 'userLocation';
	private defaultLocation = 'Bangalore';

	// BehaviorSubject to store the current location
	private locationSubject = new BehaviorSubject<string>(this.getLocation());
	location$ = this.locationSubject.asObservable();

	constructor() {}

	// Set the location and emit the new value
	setLocation(location: string): void {
		localStorage.setItem(this.locationKey, location);
		this.locationSubject.next(location); // Notify subscribers of the change
	}

	// Retrieve the current location of the user
	getLocation(): string {
		return localStorage.getItem(this.locationKey) || this.defaultLocation;
	}

	// Clear the stored location (optional, in case needed)
	clearLocation(): void {
		localStorage.removeItem(this.locationKey);
		this.locationSubject.next(this.defaultLocation); // Reset to default and notify
	}
}
