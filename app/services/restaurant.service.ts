import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { LocationService } from './location.service';
interface Restaurant {
	id: string;
	name: string;
	rating: number;
	deliveryTime: string;
	priceForTwo: number;
	cuisines: string[];
	items: any[];
}

@Injectable({
	providedIn: 'root'
})
export class RestaurantService {
	private dataUrl = '/assets/data/data.json';

	constructor(
		private http: HttpClient,
		private locationService: LocationService
	) {}

	getRestaurantsByLocation(locationName: string): Observable<Restaurant[]> {
		return this.http.get<any>(this.dataUrl).pipe(
			map(data => {
				const locationData = data.locations.find((location: any) => location.name === locationName);
				return locationData ? locationData.restaurants : [];
			}),
			catchError(error => {
				console.error('Error loading data.json:', error);
				return of([]);
			})
		);
	}

	getRestaurants(): Observable<Restaurant[]> {
		return this.http.get<any>(this.dataUrl).pipe(map(data => data.locations.flatMap((location: { restaurants: any }) => location.restaurants)));
	}

	getRestaurantById(id: string): Observable<Restaurant | null> {
		return this.http.get<any>(this.dataUrl).pipe(
			map(data => {
				for (const location of data.locations) {
					const restaurant = location.restaurants.find((rest: any) => rest.id === id);
					if (restaurant) {
						console.log('Fetched Restaurant:', restaurant); // Log to console
						return restaurant;
					}
				}
				console.error('Restaurant not found');
				return null;
			}),
			catchError(error => {
				console.error('Error fetching restaurant by ID:', error);
				return of(null);
			})
		);
	}

	getItemsByCategory(category: string): Observable<any[]> {
		return this.locationService.location$.pipe(
			switchMap((locationName: any) =>
				this.http.get<any>(this.dataUrl).pipe(
					map(data => {
						const items: any[] = [];
						const locationData = data.locations.find((location: any) => location.name === locationName);
						if (locationData) {
							locationData.restaurants.forEach((restaurant: any) => {
								restaurant.items.forEach((item: any) => {
									if (item.category.toLowerCase() === category.toLowerCase()) {
										items.push({ ...item, restaurantName: restaurant.name });
									}
								});
							});
						}
						return items;
					}),
					catchError(error => {
						console.error('Error loading data.json:', error);
						return of([]);
					})
				)
			)
		);
	}
	searchFoodByLocationAndName(location: string, searchTerm: string): Observable<any[]> {
		return this.http.get<any>(this.dataUrl).pipe(
			map(data => {
				const locationData = data.locations.find((loc: any) => loc.name === location);
				if (!locationData) return [];

				return locationData.restaurants.flatMap((restaurant: any) => restaurant.items.filter((item: any) => item.name.toLowerCase().includes(searchTerm.toLowerCase())).map((item: any) => ({ ...item, restaurantName: restaurant.name })));
			}),
			catchError(() => of([]))
		);
	}
}
