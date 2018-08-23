import { TasksService } from '../tasks.service';
import { TasksDataSource } from '../tasks.datasource';
import { MatPaginator, MatSort } from '@angular/material';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Task } from '../../shared/models/task';
import { Subscription } from 'rxjs';

@Component({
  selector: 'task-datagrid',
  templateUrl: './task-datagrid.component.html',
  styleUrls: ['./task-datagrid.component.css']
})
export class TaskDatagridComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: TasksDataSource;

  tasks: Task[];
  subscription: Subscription;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'actions',
    'Id',
    'Title',
    'DueDate'
  ];

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
    this.subscription = this.tasksService.getTasks()
      .subscribe(
        (data: Task[]) => {
          this.tasks = data;

          console.log('onInit before Datasource', this.tasks);
          this.dataSource = new TasksDataSource(this.paginator, this.sort, this.tasks);
        }
      );
  }

  onRowClicked(row) {
    console.log('Row clicked: ', row);
  }

  ngOnDestroy() {
    console.log('ondestroy - datagrid component');
    this.subscription.unsubscribe();
  }

}
