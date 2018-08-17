import { Injectable } from '@angular/core';

import { Task } from '../shared/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  task: Task;
  private tasks: Task[] = [
    {Id: 1, Name: 'Task 1'},
    {Id: 2, Name: 'Task 2'},
    {Id: 3, Name: 'Task 3'},
    {Id: 4, Name: 'Task 4'},
  ]

  getTasks(){
    return this.tasks;
  }

  getTask(id: number){
    let tasks = this.getTasks();

    for (let index = 0; index < tasks.length; index++) {
      const element = tasks[index];
      //console.log(element, id);
      if (element.Id == id){
        return element;
      }
    }

    return null;
  }

  constructor() { }
}
