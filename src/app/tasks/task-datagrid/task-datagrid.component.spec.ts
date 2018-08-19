import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDatagridComponent } from './task-datagrid.component';

describe('TaskDatagridComponent', () => {
  let component: TaskDatagridComponent;
  let fixture: ComponentFixture<TaskDatagridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskDatagridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDatagridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
