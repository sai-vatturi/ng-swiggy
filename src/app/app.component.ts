import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, HomepageComponent, RegisterComponent, LoginComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
	constructor(private router: Router) {}

	ngOnInit(): void {
		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				window.scrollTo(0, 0); // Scrolls to the top of the page
			}
		});
	}
}
