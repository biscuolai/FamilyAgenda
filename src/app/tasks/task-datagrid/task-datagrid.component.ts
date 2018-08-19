import { TasksService } from './../tasks.service';
import { TasksDataSource } from './../tasks.datasource';
import { MatPaginator, MatSort } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Task } from '../../shared/task';

@Component({
  selector: 'task-datagrid',
  templateUrl: './task-datagrid.component.html',
  styleUrls: ['./task-datagrid.component.css']
})
export class TaskDatagridComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: TasksDataSource;

  tasks: Task[];

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
