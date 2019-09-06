import { TestBed } from '@angular/core/testing';

import { SentryAdapter } from './sentry-adapter';

describe('SentryAdapterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SentryAdapter = TestBed.get(SentryAdapter);
    expect(service).toBeTruthy();
  });
});
