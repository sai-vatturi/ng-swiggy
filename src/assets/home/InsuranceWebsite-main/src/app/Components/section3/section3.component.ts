import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {feature} from '../../models/Interfaces'
interface section3{
  img:string,
  alt:string,
  title:string
}
@Component({
  selector: 'app-section3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section3.component.html',
  styleUrl: './section3.component.css'
})
export class Section3Component {

  sections3:feature[]=[
    {
      img:"../../../assets/images/section3/TrustedImg.jpeg",
      alt:" trusted Img",
      title:"Trusted By Thousand"
    },
    {
      img:"../../../assets/images/section3/setForLifeImg.jpeg",
      alt:"set for life",
      title:"Set For Life"
    },
    {
      img:"../../../assets/images/section3/protectiveInsuranceImg.jpeg",
      alt:"protectiveInsuranceImg",
      title:"Protective Insurance"
    }
  ]
}
