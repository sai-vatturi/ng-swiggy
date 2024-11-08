// footer.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface FooterSection {
	title: string;
	links: { text: string; url: string }[];
}

@Component({
	selector: 'app-footer',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './footer.component.html',
	styleUrl: './footer.component.css'
})
export class FooterComponent {
	companySectionLinks = [
		{ text: 'About Us', url: '/about' },
		{ text: 'Swiggy Corporate', url: '/corporate' },
		{ text: 'Careers', url: '/careers' },
		{ text: 'Team', url: '/team' },
		{ text: 'Swiggy One', url: '/one' },
		{ text: 'Swiggy Instamart', url: '/instamart' },
		{ text: 'Swiggy Dineout', url: '/dineout' },
		{ text: 'Swiggy Genie', url: '/genie' },
		{ text: 'Minis', url: '/minis' }
	];

	contactSectionLinks = [
		{ text: 'Help & Support', url: '/help' },
		{ text: 'Partner With Us', url: '/partner' },
		{ text: 'Ride With Us', url: '/ride' }
	];

	legalSectionLinks = [
		{ text: 'Terms & Conditions', url: '/terms' },
		{ text: 'Cookie Policy', url: '/cookie-policy' },
		{ text: 'Privacy Policy', url: '/privacy' }
	];

	cities = ['Bangalore', 'Gurgaon', 'Hyderabad', 'Delhi', 'Mumbai', 'Pune'];
}
