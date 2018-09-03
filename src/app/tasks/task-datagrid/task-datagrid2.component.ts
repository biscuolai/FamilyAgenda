import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { Observable, BehaviorSubject, merge, fromEvent } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

import { Task } from './../../shared/models/task';
import { TasksService } from '../services/tasks.service';
import { DeleteDialogComponent } from './../dialogs/delete/delete.dialog.component';
import { EditDialogComponent } from './../dialogs/edit/edit.dialog.component';
import { AddDialogComponent } from './../dialogs/add/add.dialog.component';
import { Priority } from './../../shared/models/priority';
import { DropdownService } from './../../shared/services/dropdown.service';
import { Status } from './../../shared/models/status';

@Component({
  selector: 'app-task-datagrid2',
  templateUrl: './task-datagrid2.component.html',
  styleUrls: ['./task-datagrid2.component.css']
})
export class TaskDatagrid2Component implements OnInit {
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'actions',
    'id',
    'title',
    'description',
    'dueDate',
    'status',
    'priority',
    'createdDate',
    'lastModifiedDate'
  ];

  taskDatabase: TasksService | null;
  dataSource: ExampleDataSource | null;
  index: number;
  id: number;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  // modules
  statusList: Status[];
  priorityList: Priority[];

  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    private breakpointObserver: BreakpointObserver,
    public tasksService: TasksService,
    private dropdownService: DropdownService
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  ngOnInit() {
    // get the Status list - Promise
    this.dropdownService.getStatusAsync()
      .then<Status[]>((values: Status[]) => {
        console.log('status', values);
        this.statusList = values;
        return values;
      });

    // get the Priority list - Promise
    this.dropdownService.getPriorityAsync()
      .then<Priority[]>((values: Priority[]) => {
        console.log('priority', values);
        this.priorityList = values;
        return values;
      });

      // refresh / reload data from database
    this.loadData();
  }

  refresh() {
    // refresh / reload data from database
    this.loadData();
    // clean-up filter field
    this.filter.nativeElement.value = '';
  }

  addNew(task: Task) {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: { task: task }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside TasksService
        this.taskDatabase.dataChange.value.push(this.tasksService.getDialogData());
        this.refreshTable();
      }
    });
  }

  startEdit(i: number, id: number) {
    this.id = id;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    console.log(this.index);

    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside TasksService by id
        const foundIndex = this.taskDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.taskDatabase.dataChange.value[foundIndex] = this.tasksService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
  }

  deleteItem(i: number, id: number, title: string, description: string, dueDate: Date) {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { id: id, title: title, description: description, dueDate: dueDate }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.taskDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // for delete we use splice in order to remove single object from TasksService
        this.taskDatabase.dataChange.value.splice(foundIndex, 1);
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
    this.taskDatabase = new TasksService(this.httpClient);
    this.dataSource = new ExampleDataSource(this.taskDatabase, this.paginator, this.sort);
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

    const priorityName = this.priorityList.find(x => x.id === priority).name.substring(0, 1);
    return priorityName + ' ' + daysPassed;
  }

  getStatusDisplayName(status: number) {

    console.log('this.statusList', this.statusList);
    console.log('status', status);
    console.log('find', this.statusList.find(x => x.id === status));

    const statusName = this.statusList.find(x => x.id === status).name;
    return statusName;
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
        const searchStr = (task.id + task.title + task.description + task.dueDate.toString() + task.createdDate.toString()).toLowerCase();
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
      let propertyA: number | string | Date = '';
      let propertyB: number | string | Date = '';

      switch (this._sort.active) {
        case 'Id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'Title': [propertyA, propertyB] = [a.title, b.title]; break;
        case 'Description': [propertyA, propertyB] = [a.description, b.description]; break;
        case 'DueDate': [propertyA, propertyB] = [a.dueDate, b.dueDate]; break;
        case 'Status': [propertyA, propertyB] = [a.status, b.status]; break;
        case 'Priority': [propertyA, propertyB] = [a.priority, b.priority]; break;
        case 'CreatedDate': [propertyA, propertyB] = [a.createdDate, b.createdDate]; break;
        case 'LastModifiedDate': [propertyA, propertyB] = [a.lastModifiedDate, b.lastModifiedDate]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }

}
