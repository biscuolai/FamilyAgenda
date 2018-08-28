import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { TasksService } from '../../tasks.service';
import { Task } from '../../../shared/models/task';
import { Status } from '../../../shared/models/status';
import { Priority } from '../../../shared/models/priority';
import { DropdownService } from '../../../shared/services/dropdown.service';

// Datepicker libraries
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-add-dialog',
  templateUrl: '../../dialogs/add/add.dialog.component.html',
  styleUrls: ['../../dialogs/add/add.dialog.component.css'],
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

export class AddDialogComponent implements OnInit {

  // Reactive form variable
  form: FormGroup;

  // modules
  task: Task;
  statusList: Observable<Status[]>;
  priorityList: Observable<Priority[]>;

  // Select / selected items
  selectedStatus: Status;
  selectedPriority: Priority;
  selectedStatusValue: number;
  selectedPriorityValue: number;

  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private formBuilder: FormBuilder,
    private tasksService: TasksService,
    private adapter: DateAdapter<any>,
    private dropdownService: DropdownService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      Title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      Description: ['', null],
      DueDate: ['', Validators.required],
      Status: ['', Validators.required],
      Priority: ['', Validators.required],
      AssignedTo: ['', null]
    });

    // get the Status list - Observable
    this.statusList = this.dropdownService.getStatus();
    // get the Priority list - Observable
    this.priorityList = this.dropdownService.getPriority();

    // set location of DatePicker for English-Australia dd/MM/yyyy
    this.adapter.setLocale('en-AU');

    this.resetForm();
  }

  onStatusChange(newStatusValue) {
    this.selectedStatusValue = newStatusValue;
  }

  onPriorityChange(newPriorityValue) {
    this.selectedPriorityValue = newPriorityValue;
  }

  checkFormValidators(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(fieldName => {
      console.log(fieldName);
      const control = formGroup.get(fieldName);
      control.markAsDirty();
      if (control instanceof FormGroup) {
        this.checkFormValidators(control);
      }
    });
  }

  checkValidTouched(fieldName) {
    return !this.form.get(fieldName).valid && (this.form.get(fieldName).touched || this.form.get(fieldName).dirty);
  }

  private resetForm() {
    this.form.reset();

    // set default Due Date to next month
    const today = new Date();
    today.setMonth(today.getMonth() + 1);
    const dueDateYear = today.getFullYear();
    const dueDateMonth = today.getMonth();
    const dueDateDay = today.getDate();

    this.form.patchValue({
      DueDate: moment([dueDateYear, dueDateMonth, dueDateDay]),
      Title: '',
      Description: '',
      Status: '0',
      Priority: '0'
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public onSaveClick(): void {
    console.log('form', this.form);

    if (this.form.valid) {

      this.data.Title = this.form.get('Title').value;
      this.data.Description = this.form.get('Description').value;
      this.data.DueDate = this.form.get('DueDate').value._d;
      this.data.Priority = this.form.get('Priority').value;
      this.data.Status = this.form.get('Status').value;
      this.data.CreatedDate = new Date();

      console.log('form is valid', this.data);
      this.tasksService.addTask(this.data);
    } else {
      this.checkFormValidators(this.form);
    }
  }
}
