import { TestBed, inject } from '@angular/core/testing';

import { PatientUtilityService } from './patient-utility.service';

describe('PatientUtilityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PatientUtilityService]
    });
  });

  it('should be created', inject([PatientUtilityService], (service: PatientUtilityService) => {
    expect(service).toBeTruthy();
  }));
});
