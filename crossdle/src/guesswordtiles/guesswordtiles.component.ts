import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordService } from 'src/word.service';
import { TileStatusPipe } from 'src/tile-status.pipe';

@Component({
  selector: 'app-guesswordtiles',
  standalone: true,
  imports: [CommonModule, TileStatusPipe],
  templateUrl: './guesswordtiles.component.html',
  styleUrl: './guesswordtiles.component.scss'
})
export class GuessWordtilesComponent {

  @Input() currGuess:string = '';
  @Input() guessState:string = 'created';

  private wordService = inject(WordService);
  public currSecret:string = this.wordService.getWord(); 

}
