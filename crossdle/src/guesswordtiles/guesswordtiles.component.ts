import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordService } from 'src/word.service';

@Component({
  selector: 'app-guesswordtiles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './guesswordtiles.component.html',
  styleUrl: './guesswordtiles.component.scss'
})
export class GuessWordtilesComponent {

  @Input() currGuess: String = '';
  @Input() guessState:string = 'created';

  private service = inject(WordService);

  secret: string  = this.service.getWord(); //'DIM_SUM'; // this comes from a service

  charStates:any = {'*': 'empty', '_': 'black', 'matched': 'green', 'nomatch': 'red', 'contained' : 'yellow' }

  getState(index: number): String{
    console.log('setting state');
    let currLetterState= 'empty';

    if(index > this.secret?.length-1)
      return currLetterState;

    if(this.charStates[this.currGuess[index]]){
      return this.charStates[this.currGuess[index]] ;
    }

    currLetterState = 'nomatch';
    let currGuessChar = this.currGuess[index];

    if( currGuessChar === this.secret[index] ) {
      currLetterState = 'matched';
    } else if ( this.secret.includes(currGuessChar) ) {
      currLetterState = 'contained'
    }
    
    return this.charStates[currLetterState];
  }

  getLetter(index: number): String{
    let currLetterVal = '*';

    if(index > this.secret?.length-1)
      return currLetterVal;

    currLetterVal = (this.currGuess[index] === '*')? '' : this.currGuess[index] ;

    return currLetterVal;
  }

}
