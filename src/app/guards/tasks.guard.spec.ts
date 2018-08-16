import { TestBed, async, inject } from '@angular/core/testing';

import { TasksGuard } from './tasks.guard';

describe('TasksGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TasksGuard]
    });
  });

  it('should ...', inject([TasksGuard], (guard: TasksGuard) => {
    expect(guard).toBeTruthy();
  }));
});
