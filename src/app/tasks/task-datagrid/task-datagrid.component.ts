import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { TasksService } from '../tasks.service';
import { TasksDataSource } from '../tasks.datasource';
import { MatPaginator, MatSort } from '@angular/material';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Task } from '../../shared/models/task';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'task-datagrid',
  templateUrl: './task-datagrid.component.html',
  styleUrls: ['./task-datagrid.component.css']
})
export class TaskDatagridComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: TasksDataSource;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );

  tasks: Task[];
  subscription: Subscription;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'actions',
    'Id',
    'Title',
    'DueDate',
    'Priority'
  ];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private tasksService: TasksService
  ) { }

  ngOnInit() {
    this.subscription = this.tasksService.getTasks()
      .subscribe(
        (data: Task[]) => {
          this.tasks = data;

          // console.log('onInit before Datasource', this.tasks);
          this.dataSource = new TasksDataSource(this.paginator, this.sort, this.tasks);
        }
      );
  }

  onRowClicked(row) {
    console.log('Row clicked: ', row);
  }

  getPriorityDisplayName(priority: number, dueDate: string) {
    const today = new Date();
    const dueDateObj = new Date(dueDate);
    const daysPassed = this.getDateDiff(today, dueDateObj);

    const result = priority === 0 ? 'Low' : priority === 1 ? 'Med' : 'High';
    return daysPassed > 0 ? result + ' ' + daysPassed : result + ' ' + daysPassed;
  }

  getPriorityIconName(dueDate: string) {
    const today = new Date();
    const dueDateObj = new Date(dueDate);
    const daysPassed = this.getDateDiff(today, dueDateObj);

    return daysPassed > 0 ? 'sentiment_satisfied_alt' : 'error_outline';
  }

  getDateDiff(date1: Date, date2: Date) {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    return Math.round((date2.getTime() - date1.getTime()) / (oneDay));
  }

  ngOnDestroy() {
    // console.log('ondestroy - datagrid component');
    this.subscription.unsubscribe();
  }

}
