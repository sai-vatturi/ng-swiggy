import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {feature} from '../../models/Interfaces.js'

@Component({
  selector: 'app-section2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section2.component.html',
  styleUrl: './section2.component.css'
})
export class Section2Component {
  features:feature[]=[
    {
      img:"../../../assets/images/section2/returnInsurance.jpeg",
      alt:"Return policy insurance",
      title:"Money Back Guarantee"
    },
    {
      img:"../../../assets/images/section2/claimImg.jpeg",
      alt:"get back",
      title:"All Claims At Anytime"
    },
    {
      img:"../../../assets/images/section2/policyImg.jpeg",
      alt:"policy",
      title:"Digital Insurance Policy"
    },
    {
      img:"../../../assets/images/section2/DigitalPaymentImg.jpeg",
      alt:"digital payments",
      title:"Direct Payment App"
    }
  ]
}
