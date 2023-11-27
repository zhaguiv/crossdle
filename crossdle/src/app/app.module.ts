import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from 'src/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CrosswordComponent } from 'src/crossword/crossword.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HeaderComponent,
    CrosswordComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
