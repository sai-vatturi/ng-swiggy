import { Component, Input } from '@angular/core';

interface Offer {
	title: string;
	subtitle: string;
	discount: string;
	imageUrl: string;
}

@Component({
	selector: 'app-offer-card',
	templateUrl: './offer-card.component.html',
	styleUrls: ['./offer-card.component.css'],
	standalone: true
})
export class OfferCardComponent {
	@Input() offer: Offer = {
		title: 'FOOD DELIVERY',
		subtitle: 'FROM RESTAURANTS',
		discount: 'UPTO 60% OFF',
		imageUrl: 'assets/home/1.webp'
	};
}
