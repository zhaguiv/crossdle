import { Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appGridDimensions]',
  standalone: true
})
export class GridDimensionsDirective implements OnInit {

  @Input() 
  dimensions:number = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) { 
  }

  ngOnInit(): void {
    this.setGridStyle();
  }

  private setGridStyle() {
    console.log('applying dimensions');

    const gridColumnValue = `repeat(${this.dimensions}, 35px)`;

    this.renderer.setStyle(this.el.nativeElement, 'display', 'grid');
    this.renderer.setStyle(this.el.nativeElement, 'grid-template-columns', gridColumnValue );
    this.renderer.setStyle(this.el.nativeElement, 'column-gap', '1px' );
  }

}
