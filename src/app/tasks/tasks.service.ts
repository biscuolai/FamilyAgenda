import { Injectable } from '@angular/core';

import { Task } from '../shared/models/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  task: Task;
  private tasks: Task[] = [
    {Id: '1', Title: 'Task 1', Description: 'Description 1', DueDate: new Date(), AssignedTo: 'Ilson 1', Status: '0', CreatedDate: new Date(), LastModifiedDate: null, Priority: '0' },
    {Id: '2', Title: 'Task 2', Description: 'Description 2', DueDate: new Date(), AssignedTo: 'Ilson 2', Status: '0', CreatedDate: new Date(), LastModifiedDate: null, Priority: '0' },
    {Id: '3', Title: 'Task 3', Description: 'Description 3', DueDate: new Date(), AssignedTo: 'Ilson 3', Status: '0', CreatedDate: new Date(), LastModifiedDate: null, Priority: '0' },
  ]

  getTasks(){
    return this.tasks;
  }

  getTask(id: string){
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