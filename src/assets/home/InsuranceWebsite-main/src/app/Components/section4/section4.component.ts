import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { section4 } from '../../models/Interfaces';

@Component({
  selector: 'app-section4',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section4.component.html',
  styleUrl: './section4.component.css'
})
export class Section4Component {
  sections4:section4[]=[
    {
      img:"../../../assets/images/section4/image1.jpg",
      alt:"Business Insurance",
      para:"VEHICLE",
      title:"Business Insurance"
    },
    {
      img:"../../../assets/images/section4/image2.jpg",
      alt:"Vehicle Insurance",
      para:"VEHICLE",
      title:"Vehicle Insurance"
    },
    {
      img:"../../../assets/images/section4/image3.jpg",
      alt:"Car Insurance",
      para:"CAR",
      title:"Car Insurance"
    }
  ]
}
