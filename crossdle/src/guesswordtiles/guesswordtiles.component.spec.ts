import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessWordtilesComponent } from './guesswordtiles.component';

describe('GuessWordtilesComponent', () => {
  let component: GuessWordtilesComponent;
  let fixture: ComponentFixture<GuessWordtilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuessWordtilesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuessWordtilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
