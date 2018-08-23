// import { TasksService } from './../tasks.service';
// import { TasksBackendDataSource } from './../tasks-backend.datasource';
// import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
// import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
// import { merge } from 'rxjs';
// import { fromEvent } from 'rxjs';

// @Component({
//   selector: 'task-datagrid-backend',
//   templateUrl: './task-datagrid-backend.component.html',
//   styleUrls: ['./task-datagrid-backend.component.css']
// })
// export class TaskDatagridBackendComponent implements OnInit, AfterViewInit {

//   dataSource: TasksBackendDataSource;

//   displayedColumns = [
//     'Id',
//     'Title',
//     'DueDate'
//   ];

//   @ViewChild(MatPaginator) paginator: MatPaginator;

//   @ViewChild(MatSort) sort: MatSort;

//   @ViewChild('input') input: ElementRef;

//   constructor(private route: ActivatedRoute,
//     private tasksService: TasksService) {

//   }

//   ngOnInit() {

//     console.log('ngOnInit datagrid component');

//     this.dataSource = new TasksBackendDataSource(this.tasksService);

//     this.dataSource.loadTasks('', 'asc', 0, 3);
//   }

//   ngAfterViewInit() {

//     console.log('ngAfterViewInit datagrid component');

//     this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

//     fromEvent(this.input.nativeElement, 'keyup')
//       .pipe(
//         debounceTime(150),
//         distinctUntilChanged(),
//         tap(() => {
//           this.paginator.pageIndex = 0;

//           console.log('fromEvent datagrid component');

//           this.loadTasksPage();
//         })
//       )
//       .subscribe();

//     merge(this.sort.sortChange, this.paginator.page)
//       .pipe(
//         tap(() => this.loadTasksPage())
//       )
//       .subscribe();
//   }

//   loadTasksPage() {
//     console.log('loadTasksPage datagrid component',
//       this.input.nativeElement.value,
//       this.sort.direction,
//       this.paginator.pageIndex,
//       this.paginator.pageSize);

//     this.dataSource.loadTasks(
//       this.input.nativeElement.value,
//       this.sort.direction,
//       this.paginator.pageIndex,
//       this.paginator.pageSize
//     );
//   }

//   onRowClicked(row) {
//     console.log('Row clicked: ', row);
//   }
// }
