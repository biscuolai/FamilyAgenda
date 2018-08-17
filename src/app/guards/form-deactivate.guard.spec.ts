import { TestBed, async, inject } from '@angular/core/testing';

import { FormDeactivateGuard } from './form-deactivate.guard';

describe('FormDeactivateGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormDeactivateGuard]
    });
  });

  it('should ...', inject([FormDeactivateGuard], (guard: FormDeactivateGuard) => {
    expect(guard).toBeTruthy();
  }));
});
