import { TestBed } from '@angular/core/testing';

import { ThemeManagerService } from './theme-manager.service';

describe('ThemeManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThemeManagerService = TestBed.get(ThemeManagerService);
    expect(service).toBeTruthy();
  });
});
