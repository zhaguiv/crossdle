import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoTile } from 'src/types/LogoTile';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})

export class HeaderComponent {
  public logoRow1: Array<LogoTile> = [{
    id: 1,
    type: 'black',
    value: '',
    numbered: false
  },{
    id: 2,
    type: 'black',
    value: '',
    numbered: false
  },{
    id: 3,
    type: 'red',
    value: '',
    numbered: false
  },{
    id: 4,
    type: 'black',
    value: '',
    numbered: false
  },{
    id: 5,
    type: 'black',
    value: '',
    numbered: false
  }];

  public logoRow2: Array<LogoTile> = [{
    id: 1,
    type: 'black',
    value: 'c',
    numbered: false
  },{
    id: 2,
    type: 'red',
    value: 'r',
    numbered: false
  },{
    id: 3,
    type: 'red',
    value: 'o',
    numbered: false
  },{
    id: 4,
    type: 'red',
    value: 's',
    numbered: false
  },{
    id: 5,
    type: 'white',
    value: 's',
    numbered: true
  }];

  public logoRow3: Array<LogoTile> = [{
    id: 1,
    type: 'black',
    value: '',
    numbered: false
  },{
    id: 2,
    type: 'black',
    value: '',
    numbered: false
  },{
    id: 3,
    type: 'red',
    value: '',
    numbered: false
  },{
    id: 4,
    type: 'black',
    value: '',
    numbered: false
  },{
    id: 5,
    type: 'white',
    value: 'd',
    numbered: false
  }];

  public logoRow4: Array<LogoTile> = [{
    id: 1,
    type: 'black',
    value: '',
    numbered: false
  },{
    id: 2,
    type: 'black',
    value: '',
    numbered: false
  },{
    id: 3,
    type: 'black',
    value: '',
    numbered: false
  },{
    id: 4,
    type: 'black',
    value: '',
    numbered: false
  },{
    id: 5,
    type: 'white',
    value: 'l',
    numbered: false
  }];

  public logoRow5: Array<LogoTile> = [{
    id: 1,
    type: 'black',
    value: '',
    numbered: false
  },{
    id: 2,
    type: 'black',
    value: '',
    numbered: false
  },{
    id: 3,
    type: 'black',
    value: '',
    numbered: false
  },{
    id: 4,
    type: 'black',
    value: '',
    numbered: false
  },{
    id: 5,
    type: 'white',
    value: 'e',
    numbered: false
  }];

  public logoRows: Array<LogoTile[]> = [this.logoRow1, this.logoRow2, this.logoRow3, this.logoRow4, this.logoRow5];

}
