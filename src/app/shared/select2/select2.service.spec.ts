import { TestBed } from '@angular/core/testing';

import { Select2Service } from './select2.service';

describe('Select2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Select2Service = TestBed.get(Select2Service);
    expect(service).toBeTruthy();
  });
});
