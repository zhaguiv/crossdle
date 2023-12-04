import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tileStatus',
  standalone: true
})
export class TileStatusPipe implements PipeTransform {

  charStates:any = {'*': 'empty', '_': 'black', 'matched': 'green', 'nomatch': 'red', 'contained' : 'yellow' }

  transform(currLetter: string, currSecret:string, currentIndex: number): string {
    if(this.charStates[currLetter]){
      return this.charStates[currLetter] ;
    }

    let currLetterState= 'nomatch';
    let currAnswerLetter= currSecret[currentIndex];

    if( currAnswerLetter === currLetter ) {
      currLetterState = 'matched'
    } else if( currSecret.includes( currLetter) ) {
      currLetterState = 'contained'
    }

    return this.charStates[currLetterState];
  }

}
