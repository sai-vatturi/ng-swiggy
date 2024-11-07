import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
	selector: 'app-order-selection-page',
	standalone: true,
	imports: [HeaderComponent],
	templateUrl: './order-selection-page.component.html',
	styleUrl: './order-selection-page.component.css'
})
export class OrderSelectionPageComponent {
	title: string = 'Order Selection Page';
}
