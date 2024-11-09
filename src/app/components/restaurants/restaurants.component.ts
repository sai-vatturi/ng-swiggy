import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LocationService } from '../../services/location.service';
import { RestaurantsSliderComponent } from '../restaurants-slider/restaurants-slider.component';

@Component({
	selector: 'app-restaurants',
	standalone: true,
	imports: [RestaurantsSliderComponent],
	templateUrl: './restaurants.component.html',
	styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit, OnDestroy {
	selectedLocation: string = '';
	private locationSubscription!: Subscription;

	constructor(private locationService: LocationService) {}

	ngOnInit(): void {
		// Subscribe to location changes
		this.locationSubscription = this.locationService.location$.subscribe(location => {
			this.selectedLocation = location;
		});
	}

	ngOnDestroy(): void {
		// Unsubscribe to prevent memory leaks
		if (this.locationSubscription) {
			this.locationSubscription.unsubscribe();
		}
	}
}
