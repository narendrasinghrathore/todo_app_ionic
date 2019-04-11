import { TestBed } from '@angular/core/testing';

import { OnlineStorageService } from './online-storage.service';

describe('OnlineStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OnlineStorageService = TestBed.get(OnlineStorageService);
    expect(service).toBeTruthy();
  });
});
