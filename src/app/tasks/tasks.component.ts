import { Component, OnInit } from '@angular/core';

import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: any[];

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
    this.tasks = this.tasksService.getTasks();
  }

}
