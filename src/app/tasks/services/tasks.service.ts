import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Task } from '../../shared/models/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private readonly API_URL = `${environment.API_URL}tasks/`;

  // Temporarily stores data from dialogs
  dialogData: any;

  tasks: Task[];

  constructor(private http: HttpClient) { }

  getDialogData() {
    return this.dialogData;
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.API_URL);
  }

  getTask(id: number): Observable<Task> {
    return this.getTasks()
      .pipe(map(tasks => tasks.find(task => task.id == id)));
  }

  /** CRUD METHODS */
  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.API_URL);
  }

  // DEMO ONLY, you can find working methods below
  // addTask(task: Task): void {
  //   this.dialogData = task;
  //   console.log('dialogData', this.dialogData);
  // }

  // updateTask(task: Task): void {
  //   this.dialogData = task;
  //   console.log('dialogData', this.dialogData);
  // }

  // deleteTask(id: number): void {
  //   console.log(id);
  // }

  //  REAL LIFE CRUD Methods I've used in my projects. ToasterService uses Material Toasts for displaying messages:
  //     ADD, POST METHOD
  addItem(task: Task): Observable<Task> {
    this.dialogData = task;
    return this.http.post<Task>(this.API_URL, task);
  }

  // UPDATE, PUT METHOD
  updateItem(task: Task): Observable<Task> {
    this.dialogData = task;
    return this.http.put<Task>(this.API_URL + task.id, task);
  }

  // DELETE METHOD
  deleteItem(id: number): Observable<Task> {
    return this.http.delete<Task>(this.API_URL + id);
  }

}
