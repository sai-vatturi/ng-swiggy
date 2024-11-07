import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

import { Section1Component } from './Components/section1/section1.component';
import { Section2Component } from './Components/section2/section2.component';
import { Section3Component } from './Components/section3/section3.component';
import { Section4Component } from './Components/section4/section4.component';
import { Section5Component } from './Components/section5/section5.component';

import { Section6Component } from './Components/section6/section6.component';
import { Section7Component } from './Components/section7/section7.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,FooterComponent,Section1Component,
    Section2Component,Section3Component,Section4Component,Section5Component,Section6Component,Section7Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'insuranceWebsite';
}
