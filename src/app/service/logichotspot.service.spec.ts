import { TestBed } from '@angular/core/testing';

import { LogichotspotService } from './logichotspot.service';

describe('LogichotspotService', () => {
  let service: LogichotspotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogichotspotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
