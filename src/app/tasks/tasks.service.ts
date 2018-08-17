import { Injectable } from '@angular/core';

import { Task } from '../shared/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  task: Task;

  getTasks(){
    return [
      new Task(1, 'test1'),
      new Task(2, 'test2'),
      new Task(3, 'test3'),
    ]
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
