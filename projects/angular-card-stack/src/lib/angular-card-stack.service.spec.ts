import { TestBed } from '@angular/core/testing';

import { AngularCardStackService } from './angular-card-stack.service';

describe('AngularCardStackService', () => {
  let service: AngularCardStackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularCardStackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
