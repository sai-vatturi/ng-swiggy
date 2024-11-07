import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-header',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  sidenav = {display: 'none'};
  navbar:string[]=["Home","Pages","Insurances","Blog","Contact Us"]
  toggleSidebar() {
    this.sidenav.display=this.sidenav.display==='none'?'flex':'none';
  }
  closeSidebar() {
    this.sidenav.display='none';
  }
}
