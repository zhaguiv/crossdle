import { 
  Component, 
  HostListener,
  inject, 
  OnInit, 
  QueryList, 
  ViewChildren } from '@angular/core';
import { WordService } from 'src/word.service';
import { WordComponent } from 'src/word/word.component';

@Component({
  selector: 'app-crossword',
  templateUrl: './crossword.component.html',
  styleUrls: ['./crossword.component.scss'],
  standalone: true,
  imports:[WordComponent]
})
export class CrosswordComponent implements OnInit{

  private wordService = inject(WordService);

  private secretWord: string = '';

  public keysRow1: string[] = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  public keysRow2: string[] = [ 'space','A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L','space'];
  public keysRow3: string[] = ['enter','Z', 'X','C', 'V', 'B', 'N', 'M', 'del'];
  public keyRows: Array<string[]> = [this.keysRow1, this.keysRow2, this.keysRow3];

  public defaultGuess: string = '***_***';
  public currentGuess: string = '***_***';
  public currGuessIdx: number = 0;

  //get this from the service
  public hints: String[] = ['1. Small plates.', '2. Traditional chinese meal.', '3. Small plates of dumplings.'];
  public hintIdx: number = 0;

  public wrongKeys: Set<String> = new Set<String>();

  @ViewChildren(WordComponent) wordTiles !: QueryList<any>;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    this.editGuess(event.key);
  }

  ngOnInit(): void {
    this.wordService.setWord('DIM_SUM');
    this.secretWord = this.wordService.getWord();
  }

  wrongKeyDetected(letter: string): boolean {
    return this.wrongKeys.has(letter); 
  }

  updateTileWithGuess() {
    console.log('updating the tile with guess')
    if( this.wordTiles.get(this.hintIdx) ) {
      this.wordTiles.get(this.hintIdx).currGuess = this.currentGuess;
    }
  }

  updateTileShowHint() {
    if(this.wordTiles.get(this.hintIdx)){
      this.wordTiles.get(this.hintIdx).moveStateHint();
    }
  }

  submitTileWithGuess() {
    //move the word to a submitted state
    if( this.wordTiles.get(this.hintIdx) ) {
      let currTile = this.wordTiles.get(this.hintIdx);
      currTile.currGuess = this.currentGuess;
      currTile.moveStateSubmitted();
    }
  }

  updateKeyboardState() {
    if(this.currentGuess) {
      //disable all wrong letters from the submitted guess
      for(const currchar of this.currentGuess){
        if( !this.secretWord.includes(currchar) ) {
          let charUpper = currchar.toUpperCase();
          this.wrongKeys.add(charUpper);
        }
      }
    }
  }

  editGuess(currLetter: string): void {

    if( this.hintIdx > this.hints.length-1)
      return;

    if(this.currGuessIdx > this.secretWord.length)
      this.currGuessIdx = this.secretWord.length;

    if(this.currGuessIdx < 0)
      this.currGuessIdx = 0;

    let currLetterUpper = currLetter.toUpperCase();
    
    //add browser values for delete or backspace keys here
    let deleteValues = new Set<String>(['DEL','DELETE','BACKSPACE']);
    let isDeleteAction = deleteValues.has(currLetterUpper);
    if(isDeleteAction)
      currLetterUpper = 'DEL';
  
    //or the guess word is max length, dont do anything
    if (!/^[A-Z]$/.test(currLetterUpper) && currLetterUpper !== 'ENTER' && !isDeleteAction) 
      return;

    switch(currLetterUpper) {
      case 'DEL' : {
        if(this.currGuessIdx ===0)
          break;

        let nextGuessIdx = Math.max(0, (this.currGuessIdx-1));

        let removeEmptySpace = this.secretWord[nextGuessIdx]==='_';
        nextGuessIdx = (removeEmptySpace) ? Math.max(0, (nextGuessIdx-1)) : nextGuessIdx;
        
        let secretChunk = this.secretWord.slice(nextGuessIdx, this.secretWord.length).replace(/[a-z]/ig, '*');
        this.currentGuess = this.currentGuess.slice(0,nextGuessIdx) + secretChunk;
        this.currGuessIdx = nextGuessIdx;
        this.updateTileWithGuess();
        break; 
      }
      case 'ENTER' : { 
        if(!this.currentGuess.includes('*')) {
          this.attemptGuess();
        }
        break;
      }
      default: {
        if( this.wrongKeyDetected(currLetterUpper))
          break;
        let nextGuessIdx = Math.min(this.secretWord.length, (this.currGuessIdx+1));
        let prependEmptySpace = this.secretWord[this.currGuessIdx]==='_';
        nextGuessIdx = (prependEmptySpace) ? Math.min((this.secretWord.length-1),nextGuessIdx+1): nextGuessIdx;

        let secretChunk = this.secretWord.slice(nextGuessIdx, this.secretWord.length).replace(/[a-z]/ig, '*');
        this.currentGuess = this.currentGuess.slice(0,nextGuessIdx-1) + currLetterUpper + secretChunk;
        this.currGuessIdx = nextGuessIdx;
        
        this.updateTileWithGuess();
        break;
      }
    }
    
  }

  attemptGuess(): void {
    this.submitTileWithGuess();
    this.updateKeyboardState();

    this.hintIdx++;

    //show the next hint
    this.updateTileShowHint();
  
    //reset the current guest to the default guess, and reset the index 
    this.currentGuess = this.defaultGuess;
    this.currGuessIdx = 0;
  }
}
