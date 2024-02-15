import {
  AfterContentInit,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  HostListener,
  QueryList,
  ViewChild,
  ViewEncapsulation,
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
  encapsulation: ViewEncapsulation.None,
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

    if (this.startX !== undefined && Math.abs(endX - this.startX) > 40) {
      if (endX < this.startX) {
        console.log('Swipe left');
        this.moveCardOut('left');
      } else {
        console.log('Swipe right');
        this.moveCardOut('right');
      }
    }
  }

  moveCardOut(direction: 'left' | 'right'): void {
    if (this.cards && this.cards.length > 0) {
      const currentCardEl =
        this.cards.toArray()[this.activeCardIndex].el.nativeElement;
      currentCardEl.classList.add(
        direction === 'left' ? 'card-move-out-left' : 'card-move-out-right'
      );

      setTimeout(() => {
        this.activeCardIndex = (this.activeCardIndex + 1) % this.cards!.length;
        this.updateCardPositions();
      }, 500);
    }
  }

  updateCardPositions(): void {
    this.cards?.forEach((card, index) => {
      const cardElement = card.el.nativeElement;
      cardElement.className = 'card';
      const positionIndex =
        (index - this.activeCardIndex + this.cards!.length) %
        this.cards!.length;
      cardElement.classList.add(`card-${positionIndex}`);
      if (index === this.activeCardIndex) {
        cardElement.classList.add('active');
      }
    });
  }
}
