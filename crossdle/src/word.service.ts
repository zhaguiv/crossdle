import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  constructor() { }

  setWord( answer: string): void {
    console.log('setting answer in service')
    localStorage.setItem('currword',answer);
  }

  getWord(): string {
    console.log('getting answer in service');
    return localStorage.getItem('currword') as string;
  }
}
