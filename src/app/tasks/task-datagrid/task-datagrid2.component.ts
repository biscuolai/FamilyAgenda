import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { Observable, BehaviorSubject, merge, fromEvent } from 'rxjs';
import { DataSource} from '@angular/cdk/collections';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

import { Task } from './../../shared/models/task';
import { TasksService } from './../tasks.service';
import { DeleteDialogComponent } from './../../shared/dialogs/delete/delete.dialog.component';
import { EditDialogComponent } from './../../shared/dialogs/edit/edit.dialog.component';
import { AddDialogComponent } from './../../shared/dialogs/add/add.dialog.component';

@Component({
  selector: 'app-task-datagrid2',
  templateUrl: './task-datagrid2.component.html',
  styleUrls: ['./task-datagrid2.component.css']
})
export class TaskDatagrid2Component implements OnInit {
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'actions',
    'Id',
    'Title',
    'DueDate',
    'Priority'
  ];

  exampleDatabase: TasksService | null;
  dataSource: ExampleDataSource | null;
  index: number;
  id: number;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              private breakpointObserver: BreakpointObserver,
              public tasksService: TasksService) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  addNew(task: Task) {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: { task: task }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside TasksService
        this.exampleDatabase.dataChange.value.push(this.tasksService.getDialogData());
        this.refreshTable();
      }
    });
  }

  startEdit(i: number, id: number, title: string, description: string) {
    this.id = id;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {id: id, title: title, description: description }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside TasksService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.Id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] = this.tasksService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
  }

  deleteItem(i: number, id: number, title: string, description: string, dueDate: Date) {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {id: id, title: title, description: description, dueDate: dueDate}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.Id === this.id);
        // for delete we use splice in order to remove single object from TasksService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }

  // If you don't need a filter or a pagination this can be simplified, you just use code from else block
  private refreshTable() {
    // if there's a paginator active we're using it for refresh
    if (this.dataSource._paginator.hasNextPage()) {
      this.dataSource._paginator.nextPage();
      this.dataSource._paginator.previousPage();
      // in case we're on last page this if will tick
    } else if (this.dataSource._paginator.hasPreviousPage()) {
      this.dataSource._paginator.previousPage();
      this.dataSource._paginator.nextPage();
      // in all other cases including active filter we do it like this
    } else {
      this.dataSource.filter = '';
      this.dataSource.filter = this.filter.nativeElement.value;
    }
  }

  public loadData() {
    this.exampleDatabase = new TasksService(this.httpClient);
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged()
      ).subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

  onRowClicked(row) {
    console.log('Row clicked: ', row);
  }

  getPriorityDisplayName(priority: number, dueDate: string) {
    const today = new Date();
    const dueDateObj = new Date(dueDate);
    const daysPassed = this.getDateDiff(today, dueDateObj);

    const result = priority === 0 ? 'Low' : priority === 1 ? 'Med' : 'High';
    return daysPassed > 0 ? result + ' ' + daysPassed : result + ' ' + daysPassed;
  }

  getPriorityIconName(dueDate: string) {
    const today = new Date();
    const dueDateObj = new Date(dueDate);
    const daysPassed = this.getDateDiff(today, dueDateObj);

    return daysPassed > 0 ? 'sentiment_satisfied_alt' : 'error_outline';
  }

  getDateDiff(date1: Date, date2: Date) {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    return Math.round((date2.getTime() - date1.getTime()) / (oneDay));
  }


}


export class ExampleDataSource extends DataSource<Task> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Task[] = [];
  renderedData: Task[] = [];

  constructor(public _exampleDatabase: TasksService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Task[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getAllTasks();

    return merge(...displayDataChanges).pipe(map(() => {
      // Filter data
      this.filteredData = this._exampleDatabase.data.slice().filter((task: Task) => {
        const searchStr = (task.Id + task.Title + task.Description).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);

      console.log('connect', this.renderedData);

      return this.renderedData;
    }));
  }

  disconnect() {
  }

  /** Returns a sorted copy of the database data. */
  sortData(data: Task[]): Task[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'Id': [propertyA, propertyB] = [a.Id, b.Id]; break;
        case 'Title': [propertyA, propertyB] = [a.Title, b.Title]; break;
        case 'Description': [propertyA, propertyB] = [a.Description, b.Description]; break;
        case 'Priority': [propertyA, propertyB] = [a.Priority, b.Priority]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }


}
