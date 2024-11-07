import { Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { OrderSelectionPageComponent } from './components/order-selection-page/order-selection-page.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
	{ path: '', component: HomepageComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'order-selection', component: OrderSelectionPageComponent },
	{ path: 'favorites', component: FavoritesComponent },
	{ path: 'cart', component: CartComponent },
	{ path: '**', redirectTo: '' }
];
