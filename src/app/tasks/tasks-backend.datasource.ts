// import { catchError, finalize } from 'rxjs/operators';
// import { TasksService } from './tasks.service';
// import { DataSource, CollectionViewer } from '@angular/cdk/collections';
// import { BehaviorSubject, of, Observable } from 'rxjs';

// import { Task } from './../shared/models/task';

// export class TasksBackendDataSource implements DataSource<Task> {

//   private tasksSubject = new BehaviorSubject<Task[]>([]);

//   private loadingSubject = new BehaviorSubject<boolean>(false);

//   public loading$ = this.loadingSubject.asObservable();

//   constructor(private tasksService: TasksService) {

//   }

//   loadTasks(
//     filter: string,
//     sortDirection: string,
//     pageIndex: number,
//     pageSize: number
//   ) {

//     console.log('inside loadTasks',
//     filter,
//     sortDirection,
//     pageIndex,
//     pageSize);

//     this.loadingSubject.next(true);

//     this.tasksService.getTasksDataGrid(filter, sortDirection,
//       pageIndex, pageSize).pipe(
//         catchError(() => of([])),
//         finalize(() => this.loadingSubject.next(false))
//       )
//       .subscribe(tasks => {
//         console.log('tasks inside subscribe', tasks);
//         this.tasksSubject.next(tasks);
//       });

//   }

//   connect(collectionViewer: CollectionViewer): Observable<Task[]> {
//     console.log('Connecting data source');
//     return this.tasksSubject.asObservable();
//   }

//   disconnect(collectionViewer: CollectionViewer): void {
//     this.tasksSubject.complete();
//     this.loadingSubject.complete();
//   }

// }
