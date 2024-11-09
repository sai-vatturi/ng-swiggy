import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

interface FoodItem {
	name: string; // used for alt text accessibility
	image: string;
}

@Component({
	selector: 'app-food-item-slider',
	templateUrl: './food-item-slider.component.html',
	styleUrls: ['./food-item-slider.component.css'],
	standalone: true,
	imports: [CommonModule]
})
export class FoodItemSliderComponent implements OnInit {
	@ViewChild('scrollContainer') scrollContainer!: ElementRef;

	foodItems: FoodItem[] = [
		{ name: 'Biryani', image: 'assets/home/items/biryani.avif' },
		{ name: 'Burger', image: 'assets/home/items/burger.avif' },
		{ name: 'Cake', image: 'assets/home/items/cake.avif' },
		{ name: 'Chinese', image: 'assets/home/items/chinese.avif' },
		{ name: 'Dosa', image: 'assets/home/items/dosa.avif' },
		{ name: 'Gulab Jamun', image: 'assets/home/items/gulabjamun.avif' },
		{ name: 'Ice Cream', image: 'assets/home/items/icecream.avif' },
		{ name: 'Idly', image: 'assets/home/items/idly.avif' },
		{ name: 'Kebab', image: 'assets/home/items/kebab.avif' },
		{ name: 'Noodles', image: 'assets/home/items/noodles.avif' },
		{ name: 'North Indian', image: 'assets/home/items/northindian.avif' },
		{ name: 'Paratha', image: 'assets/home/items/paratha.avif' },
		{ name: 'Parotta', image: 'assets/home/items/parotta.avif' },
		{ name: 'Pastry', image: 'assets/home/items/pastry.avif' },
		{ name: 'Pizza', image: 'assets/home/items/pizza.avif' },
		{ name: 'Rasmalai', image: 'assets/home/items/rasmalai.avif' },
		{ name: 'Rolls', image: 'assets/home/items/rolls.avif' },
		{ name: 'Shake', image: 'assets/home/items/shake.avif' },
		{ name: 'Shawarma', image: 'assets/home/items/shawarma.avif' },
		{ name: 'South Indian', image: 'assets/home/items/southindian.avif' }
	];

	itemsPerView = 4; // Default number of items to show based on screen size

	constructor(private router: Router) {}

	showFoodDetails(category: string): void {
		this.router.navigate(['/food-details'], { queryParams: { category } });
	}

	ngOnInit() {
		this.updateItemsPerView();
	}

	@HostListener('window:resize', ['$event'])
	onResize() {
		this.updateItemsPerView();
	}

	// Update the number of items per view based on screen size
	updateItemsPerView() {
		const width = window.innerWidth;
		if (width >= 1024) {
			this.itemsPerView = 8;
		} else if (width >= 768) {
			this.itemsPerView = 6;
		} else {
			this.itemsPerView = 4;
		}
	}

	// Scroll the container to the previous set of items
	scrollPrevious() {
		const container = this.scrollContainer.nativeElement;
		const scrollAmount = container.clientWidth;
		container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
	}

	// Scroll the container to the next set of items
	scrollNext() {
		const container = this.scrollContainer.nativeElement;
		const scrollAmount = container.clientWidth;
		container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
	}
}
