import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HowtoComponent } from 'src/howto/howto.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, HowtoComponent, RouterModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

}
