import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { footer } from '../../models/Interfaces';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
 email:string="youme@Rule.com"
//  company:string[]=["Case Studies",'Case Details',"Privacy Policy","Services"];
//  explore:string[]=["About Us","Blog And News","Blog Details","Pricing"];

 footerdescription:footer={
  Company:["Case Studies",'Case Details',"Privacy Policy","Services"],
  Explore:["About Us","Blog And News","Blog Details","Pricing"],
  Insurance:["Health Insurance","Car Insurance","Business Insurance","Life Insurance"]
 }
 
 get footerKeys() {
  return Object.keys(this.footerdescription) as Array<keyof footer>;
}
}
