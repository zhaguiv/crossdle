import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuessWordtilesComponent } from 'src/guesswordtiles/guesswordtiles.component';
import { GridDimensionsDirective } from 'src/grid-dimensions.directive';
import { animate, style, transition, trigger } from '@angular/animations';

export type WordState = 'created'| 'show-hint' | 'submitted' ;

@Component({
  selector: 'app-word',
  standalone: true,
  imports: [CommonModule, 
    GuessWordtilesComponent,
    GridDimensionsDirective
  ],
  templateUrl: './word.component.html',
  styleUrl: './word.component.scss',
  animations: [
    trigger(
      'blurhint-animation',
      [
        transition(
          ':enter', 
          [
            style({opacity: 0}),
            animate('3500ms', style({opacity: 1}))
          ]
        )
      ]
    )
  ]
})
export class WordComponent implements OnInit{
  
  wordSubmitted: boolean = false;
  hints: number = 3;
  @Input() currGuess: String = '';
  @Input() currHint: String = '';
  @Input() staticWord: boolean = false;
  currState: WordState = 'created';

  isSubmitted(): boolean {
    return this.currState === 'submitted';
  }

  showHint(): boolean {
    return this.currState === 'show-hint' || this.currState === 'submitted';
  }

  moveStateHint(): void {
    this.currState = 'show-hint';
  }

  moveStateSubmitted(): void {
    this.currState = 'submitted';
  }

  public currGuessSize: number = 9;

  ngOnInit(): void {
    this.currGuessSize = this.currGuess.length;
    if(this.staticWord)
      this.moveStateSubmitted();
  }

}
