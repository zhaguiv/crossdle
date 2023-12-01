import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HowtoComponent } from 'src/howto/howto.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, HowtoComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

}
