import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
	selector: 'app-cart',
	standalone: true,
	imports: [HeaderComponent, FooterComponent],
	templateUrl: './cart.component.html',
	styleUrl: './cart.component.css'
})
export class CartComponent {}
