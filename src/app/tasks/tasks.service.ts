import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  getTasks(){
    return [
      {id: 1, name: 'test1'},
      {id: 2, name: 'test2'},
      {id: 3, name: 'test3'},
      {id: 4, name: 'test4'}
    ]
  }

  getTask(id: number){
    let tasks = this.getTasks();

    for (let index = 0; index < tasks.length; index++) {
      const element = tasks[index];
      //console.log(element, id);
      if (element.id == id){
        return element;
      }
    }

    return null;
  }

  constructor() { }
}
