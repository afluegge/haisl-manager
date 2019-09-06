import { TestBed } from '@angular/core/testing';

import { ShutdownHandlerService } from './shutdown-handler.service';

describe('ShutdownHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShutdownHandlerService = TestBed.get(ShutdownHandlerService);
    expect(service).toBeTruthy();
  });
});
