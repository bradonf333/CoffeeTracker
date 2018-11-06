import { TestBed } from '@angular/core/testing';

import { CoffeeServiceService } from './coffee-service.service';

describe('CoffeeServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoffeeServiceService = TestBed.get(CoffeeServiceService);
    expect(service).toBeTruthy();
  });
});
