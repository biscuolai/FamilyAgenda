import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { TasksService } from '../../services/tasks.service';
import { Task } from '../../../shared/models/task';
import { DropdownService } from '../../../shared/services/dropdown.service';
import { Priority } from './../../../shared/models/priority';
import { Status } from './../../../shared/models/status';

// Datepicker libraries
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
import { FormValidators } from '../../../shared/utils/FormValidators';
const moment = _moment;

@Component({
  selector: 'app-edit-dialog',
  templateUrl: '../../dialogs/edit/edit.dialog.component.html',
  styleUrls: ['../../dialogs/edit/edit.dialog.component.css'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    { provide: MAT_DATE_LOCALE, useValue: 'en-AU' },

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ]
})
export class EditDialogComponent implements OnInit, OnDestroy {

  // Reactive form variable
  form: FormGroup;

  // modules
  statusList: Promise<Status[]>;
  priorityList: Promise<Priority[]>;

  // Select / selected items
  selectedStatusValue: number;
  selectedPriorityValue: number;

  taskSubscription: Subscription;

  task: Task;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private tasksService: TasksService,
    private adapter: DateAdapter<any>,
    private dropdownService: DropdownService
  ) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      Id: ['', null],
      Title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      Description: ['', null],
      DueDate: ['', Validators.required],
      Status: ['', Validators.required],
      Priority: ['', Validators.required],
      AssignedTo: ['', null]
    });

    // get the Priority list - Promise
    this.priorityList = this.dropdownService.getPriorityAsync();
    // get the Priority list - Promise
    this.statusList = this.dropdownService.getStatusAsync();

    // set location of DatePicker for English-Australia dd/MM/yyyy
    this.adapter.setLocale('en-AU');

    this.taskSubscription = this.tasksService.getTask(this.data)
    .subscribe( (result: Task) => {

        this.form.patchValue({
          Id: result.Id,
          Title: result.Title,
          Description: result.Description,
          DueDate: result.DueDate,
          AssignedTo: result.AssignedTo,
          Status: result.Status,
          Priority: result.Priority
        });

        this.selectedPriorityValue = result.Priority;
        this.selectedStatusValue = result.Status;
      }
    );
  }

  onStatusChange(newStatusValue) {
    this.selectedStatusValue = newStatusValue;
  }

  onPriorityChange(newPriorityValue) {
    this.selectedPriorityValue = newPriorityValue;
  }

  checkValidTouched(fieldName) {
    FormValidators.checkValidTouched(this.form, fieldName);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public onSaveClick(): void {
    console.log('form', this.form);

    if (this.form.valid) {

      this.task = this.form.value;

      console.log('form is valid', this.task);
      this.tasksService.updateTask(this.task);
    } else {
      FormValidators.checkFormValidators(this.form);
    }
  }

  ngOnDestroy() {
    if (this.taskSubscription != null) {
      this.taskSubscription.unsubscribe();
    }
  }
}
