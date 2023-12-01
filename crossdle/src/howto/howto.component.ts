import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordComponent } from 'src/word/word.component';

@Component({
  selector: 'app-howto',
  standalone: true,
  imports: [CommonModule, WordComponent],
  templateUrl: './howto.component.html',
  styleUrl: './howto.component.scss'
})
export class HowtoComponent {

}
