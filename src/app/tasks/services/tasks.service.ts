import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Task } from '../../shared/models/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private readonly API_URL = `${environment.API_URL}tasks/`;

  dataChange: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  tasks: Task[];
  // subscription: Subscription;

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.API_URL);
  }

  getTask(id: number): Observable<Task> {
    return this.getTasks()
      .pipe(map(tasks => tasks.find(task => task.id == id)));
  }

  // deleteTask(id: number) {
  //   alert('task delete id: ' + id);
  //   // this.http.put<Task>(this.API_URL, id);
  // }

  get data(): Task[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllTasks(): void {
    this.http.get<Task[]>(this.API_URL).subscribe(data => {
      this.dataChange.next(data);
    },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      });
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
  addItem(task: Task): void {
    this.http.post(this.API_URL, task).subscribe(data => {
      this.dialogData = task;
      // this.toasterService.showToaster('Successfully added', 3000);
    },
      (err: HttpErrorResponse) => {
        // this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      });
  }

  // UPDATE, PUT METHOD
  updateItem(task: Task): void {
    this.http.put(this.API_URL + task.id, task).subscribe(data => {
      this.dialogData = task;
      // this.toasterService.showToaster('Successfully edited', 3000);
    },
      (err: HttpErrorResponse) => {
        // this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

  // DELETE METHOD
  deleteItem(id: number): void {
    this.http.delete(this.API_URL + id).subscribe(data => {
      console.log(data['']);
      // this.toasterService.showToaster('Successfully deleted', 3000);
    },
      (err: HttpErrorResponse) => {
        // this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }
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


