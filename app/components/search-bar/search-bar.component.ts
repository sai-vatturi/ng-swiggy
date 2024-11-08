// search-bar.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-search-bar',
	standalone: true,
	template: `
		<div class="flex justify-center p-6 mt-12 bg-white">
			<div class="relative w-full max-w-md">
				<input type="text" class="border border-gray-200 rounded-full pl-12 pr-5 py-3 w-full text-gray-700 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm transition-all duration-300 ease-in-out hover:shadow-md" placeholder="Search for food..." [(ngModel)]="searchTerm" (input)="onSearch()" />
				<svg class="w-6 h-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
				</svg>
			</div>
		</div>
	`,
	imports: [FormsModule]
})
export class SearchBarComponent {
	@Output() search = new EventEmitter<string>();
	searchTerm: string = '';

	onSearch() {
		this.search.emit(this.searchTerm);
	}
}
