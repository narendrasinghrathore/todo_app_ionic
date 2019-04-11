import { TestBed } from '@angular/core/testing';

import { FactoryService } from './factory.service';

describe('FactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FactoryService = TestBed.get(FactoryService);
    expect(service).toBeTruthy();
  });
});
