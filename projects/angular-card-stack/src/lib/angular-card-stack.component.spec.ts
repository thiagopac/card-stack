import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularCardStack } from './angular-card-stack.component';

describe('AngularCardStack', () => {
  let component: AngularCardStack;
  let fixture: ComponentFixture<AngularCardStack>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularCardStack],
    }).compileComponents();

    fixture = TestBed.createComponent(AngularCardStack);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
