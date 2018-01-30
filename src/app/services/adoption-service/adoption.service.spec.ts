import { TestBed, inject } from '@angular/core/testing';

import { AdoptionServiceService } from './adoption-service.service';

describe('AdoptionServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdoptionServiceService]
    });
  });

  it('should be created', inject([AdoptionServiceService], (service: AdoptionServiceService) => {
    expect(service).toBeTruthy();
  }));
});
