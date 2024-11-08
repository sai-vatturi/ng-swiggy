import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { FoodDetailsComponent } from './components/food-details/food-details.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { OrderSelectionPageComponent } from './components/order-selection-page/order-selection-page.component';
import { RegisterComponent } from './components/register/register.component';
import { RestaurantDetailComponent } from './components/restaurant-detail/restaurant-detail.component';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
	{ path: '', component: HomepageComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'order-selection', component: OrderSelectionPageComponent, canActivate: [authGuard] },
	{ path: 'favorites', component: FavoritesComponent, canActivate: [authGuard] },
	{ path: 'cart', component: CartComponent, canActivate: [authGuard] },
	{ path: 'restaurants', component: RestaurantsComponent, canActivate: [authGuard] },
	{ path: 'restaurant-detail/:id', component: RestaurantDetailComponent, canActivate: [authGuard] },
	{ path: 'food-details', component: FoodDetailsComponent, canActivate: [authGuard] },
	{ path: 'categories', component: CategoriesComponent, canActivate: [authGuard] },
	{ path: '**', redirectTo: '' }
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			scrollPositionRestoration: 'top' // Ensure page scrolls to top on navigation
		})
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
