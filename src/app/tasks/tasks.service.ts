import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Task } from '../shared/models/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasks: Task[];
  // subscription: Subscription;

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    const tasksUrl = 'assets/data/tasks.json';
    return this.http.get<Task[]>(tasksUrl);
  }

  getTask(id: number): Observable<Task> {
    return this.getTasks()
      .pipe(map(tasks => tasks.find(task => task.Id == id)));
  }

  // getTasksDataGrid(
  //   filter = '', sortOrder = 'asc',
  //   pageNumber = 0, pageSize = 3):  Observable<Task[]> {

  //   const tasksUrl = 'assets/data/tasks.json';

  //   console.log('inside getTasksDataGrid');

  //   return this.http.get<Task[]>(tasksUrl, {
  //       params: new HttpParams()
  //           .set('filter', filter)
  //           .set('sortOrder', sortOrder)
  //           .set('pageNumber', pageNumber.toString())
  //           .set('pageSize', pageSize.toString())
  //   });
  // }

  // getTask(id: string): Observable<Task> {
  //   this.subscription = this.getTasks().subscribe(
  //     (data: Task[]) => {
  //       this.tasks = data;

  //       console.log('inside gettask', data);

  //       for (let i = 0; i < this.tasks.length; i++) {
  //         const task = this.tasks[i];
  //         console.log('for', task, task.Id, id);
  //         if (task.Id === id) {
  //           return of(task);
  //         }
  //       }
  //     }
  //   );
  //   return of(null);
  // }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

}
