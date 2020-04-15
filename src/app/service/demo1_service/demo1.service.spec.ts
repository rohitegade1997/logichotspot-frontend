import { TestBed } from '@angular/core/testing';

import { Demo1Service } from './demo1.service';

describe('Demo1Service', () => {
  let service: Demo1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Demo1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
