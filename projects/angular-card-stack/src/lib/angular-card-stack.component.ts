import {
  AfterContentInit,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  HostListener,
  QueryList,
  ViewChild,
} from '@angular/core';

@Directive({
  selector: '[appCard]',
})
export class CardDirective {
  constructor(public el: ElementRef) {}
}

@Component({
  selector: 'angular-card-stack',
  standalone: true,
  imports: [],
  templateUrl: './angular-card-stack.component.html',
  styleUrls: ['./angular-card-stack.component.scss'],
})
export class AngularCardStack implements AfterContentInit {
  private startX: number | undefined;
  private startY: number | undefined;

  @ViewChild('stackedCardsContainer') stackedCardsContainer:
    | ElementRef
    | undefined;

  @ContentChildren(CardDirective) cards: QueryList<CardDirective> | undefined;
  activeCardIndex: number = 0;

  constructor() {}

  ngAfterContentInit(): void {
    this.cards?.changes.subscribe(() => {
      this.updateCardPositions();
    });
    this.updateCardPositions();
  }

  ngAfterViewInit(): void {}

  @HostListener('touchstart', ['$event'])
  @HostListener('mousedown', ['$event'])
  onSwipeStart(event: TouchEvent | MouseEvent): void {
    if (event instanceof TouchEvent) {
      this.startX = event.touches[0].clientX;
      this.startY = event.touches[0].clientY;
    } else {
      this.startX = (event as MouseEvent).clientX;
      this.startY = (event as MouseEvent).clientY;
    }
  }

  @HostListener('touchend', ['$event'])
  @HostListener('mouseup', ['$event'])
  onSwipeEnd(event: TouchEvent | MouseEvent): void {
    let endX: number;
    let endY: number;

    if (event instanceof TouchEvent) {
      endX = event.changedTouches[0].clientX;
      endY = event.changedTouches[0].clientY;
    } else {
      endX = (event as MouseEvent).clientX;
      endY = (event as MouseEvent).clientY;
    }

    if (Math.abs(endX - this.startX!) > Math.abs(endY - this.startY!)) {
      if (endX < this.startX!) {
        console.log('Swipe left');
      } else {
        console.log('Swipe right');
      }
    }
  }

  updateCardPositions() {
    this.cards?.forEach((card, index) => {
      const cardElement = card.el.nativeElement;
      cardElement.className = 'card';
      if (index < this.activeCardIndex) {
        cardElement.classList.add('card-move-out');
      } else {
        const position = index - this.activeCardIndex;
        cardElement.classList.add(`card-${position}`);
      }
    });
  }
}
