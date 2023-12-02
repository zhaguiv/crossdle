import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordComponent } from 'src/word/word.component';
import { WordService } from 'src/word.service';

@Component({
  selector: 'app-howto',
  standalone: true,
  imports: [CommonModule, WordComponent],
  templateUrl: './howto.component.html',
  styleUrl: './howto.component.scss'
})
export class HowtoComponent{

  private wordService = inject(WordService);

  constructor(){
    console.log('setting word')
    this.wordService.setWord('letters');
  }

}
