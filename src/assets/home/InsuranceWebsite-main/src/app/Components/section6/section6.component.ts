import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { section4 } from '../../models/Interfaces';
@Component({
  selector: 'app-section6',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section6.component.html',
  styleUrl: './section6.component.css'
})
export class Section6Component {
  sections6:section4[]=[
    {
      img:"../../../assets/images/section6/prof-image.jpg",
      alt:"Mesiva Sccot",
      title:"Mesiva Sccot",
      para:"Marketing Ex."
    },
    {
      img:"../../../assets/images/section6/prof-pic.jpg",
      alt:"Jason Thomson",
      title:"Jason Thomson",
      para:"Marketing Ex."
    },
    {
      img:"../../../assets/images/section6/prof-image2.jpg",
      alt:"Kohn Wright",
      title:"Kohn Wright",
      para:"Marketing Ex."
    },
    {
      img:"../../../assets/images/section6/prof-image3.jpg",
      alt:"Andrew Schimke",
      title:"Andrew Schimke",
      para:"Marketing Ex."
    }
  ]
}
