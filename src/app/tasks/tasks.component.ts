import { MatPaginator, MatSort } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';

import { TasksService } from './tasks.service';
import { TasksDataSource } from './tasks.datasource';
import { Task } from './../shared/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: TasksDataSource;

  tasks: Task[];

  isLinear: boolean = true;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'actions',
    'Id', 
    'Title', 
    'DueDate'
  ];

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
    this.tasks = this.tasksService.getTasks();
    console.log('onInit before Datasource', this.tasks);
    this.dataSource = new TasksDataSource(this.paginator, this.sort, this.tasks);
  }

}
