import { TestBed } from '@angular/core/testing';

import { OfflineStorageService } from './offline-storage.service';

describe('OfflineStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OfflineStorageService = TestBed.get(OfflineStorageService);
    expect(service).toBeTruthy();
  });
});
