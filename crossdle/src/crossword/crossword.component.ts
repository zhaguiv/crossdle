import { 
  AfterViewInit, 
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
export class CrosswordComponent implements OnInit,AfterViewInit{

  private wordService = inject(WordService);

  private secretWord: string = '';
  private currentAttempt: number = 0;

  public keysRow1: string[] = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  public keysRow2: string[] = [ 'space','A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L','space'];
  public keysRow3: string[] = ['enter','Z', 'X','C', 'V', 'B', 'N', 'M', 'del'];
  public keyRows: Array<string[]> = [this.keysRow1, this.keysRow2, this.keysRow3];

  public defaultGuess: string = '***_***';
  public currentGuess: string = '***_***';
  public currGuessIdx: number = 0;

  //get this from the service
  public hints: String[] = ['Small plates.', 'Traditional chinese meal.', 'Small plates of dumplings.'];
  public hintIdx: number = 0;

  public wrongKeys: Set<String> = new Set<String>();

  @ViewChildren(WordComponent) wordTiles !: QueryList<any>;

  ngOnInit(): void {
    this.wordService.setWord('DIM_SUM');
    this.secretWord = this.wordService.getWord();
  }
  ngAfterViewInit() {
    // show the first tile hint by default
    console.log('showing the first tile hint');
    this.updateTileShowHint();
  }

  updateTileWithGuess() {

    if(this.hintIdx >= this.hints?.length){
      return;
    }

    //this.wordTiles.get(this.hintIdx).currentGuess = this.currentGuess;
    
    this.wordTiles?.forEach( (currTile, index) => {
      if(index === this.hintIdx) {
        currTile.currGuess = this.currentGuess;
      }
    });
  }

  wrongKeyDetected(letter: string): boolean {
    return this.wrongKeys.has(letter); 
  }

  updateTileShowHint() {
    if(this.hintIdx >= this.hints?.length){
      return;
    }

    this.wordTiles?.forEach( (tile, index) => {
      if(index === this.hintIdx)
        tile.moveStateHint();
    });

    console.log('done updating tile');
  }

  submitTileWithGuess() {
    console.log('submitting guess');
    this.wordTiles?.forEach( (currTile, index) => {
      if(index === this.hintIdx) {
        currTile.currGuess = this.currentGuess;
        currTile.moveStateSubmitted();
        currTile.wordSubmitted = true;
      }
    });

    for(const currchar of this.currentGuess){
      if( !this.secretWord.includes(currchar) ) {
        let charUpper = currchar.toUpperCase();
        this.wrongKeys.add(charUpper);
      }
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    this.editGuess(event.key);
  }

  editGuess(currLetter: string): void {

    if(this.currGuessIdx > this.secretWord.length)
      this.currGuessIdx = this.secretWord.length;

    if(this.currGuessIdx < 0)
      this.currGuessIdx = 0;

    console.log('testing ')
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
        console.log('default>>>>');
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
    
    //now that current guess was updated find the appropriate app-word cmp to update it's guess to be the current guess.
  }


  attemptGuess(): void {
    this.submitTileWithGuess();

    this.hintIdx++;
    this.currentAttempt++;

    this.updateTileShowHint();
  
    //reset the current guest to the default guess, and reset the index 
    this.currentGuess = this.defaultGuess;
    this.currGuessIdx = 0;
  }
}
