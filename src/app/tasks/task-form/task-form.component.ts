import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { TasksService } from '../tasks.service';
import { Task } from '../../shared/models/task';
import { IFormCanDeactivate } from '../../guards/iform-candeactivate';
import { Status } from '../../shared/models/status';
import { Priority } from '../../shared/models/priority';
import { DropdownService } from '../../shared/services/dropdown.service';

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
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'en-AU'},

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class TaskFormComponent implements OnInit, OnDestroy, IFormCanDeactivate {

  // Reactive form variable
  form: FormGroup;

  // Subscription variables
  paramSubscription: Subscription;
  taskSubscription: Subscription;

  // parameter from the url - id configured in routing
  id: number;

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
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private tasksService: TasksService,
    // private router: Router,
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
      CreatedDate: ['', null],
      LastModifiedDate: ['', null],
      AssignedTo: ['', null]
    });

    // get the Status list - Observable
    this.statusList = this.dropdownService.getStatus();
    // get the Priority list - Observable
    this.priorityList = this.dropdownService.getPriority();

    // set location of DatePicker for English-Australia dd/MM/yyyy
    this.adapter.setLocale('en-AU');

    this.paramSubscription = this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];

        console.log('this.id', this.id);

        // no param id has been passed, therefore it is not edit mode
        if (this.id === undefined) {
          this.resetForm();
        } else {
          this.taskSubscription = this.tasksService.getTask(this.id)
            .subscribe(
              (data: Task) => {

                console.log('data', data);

                this.task = data;

                this.form.setValue(this.task);

                // if task was found and returned data
                // if (this.task !== null) {
                //   this.form.get('Id').setValue(this.task['Id']);
                //   this.form.get('Title').setValue(this.task.Title);
                //   this.form.get('Description').setValue(this.task.Description);
                //   this.form.get('DueDate').setValue(this.task.DueDate);
                //   this.form.get('AssignedTo').setValue(this.task.AssignedTo);
                //   this.form.get('Status').setValue(this.task.Status);
                //   this.form.get('CreatedDate').setValue(this.task.CreatedDate);
                //   this.form.get('LastModifiedDate').setValue(this.task.LastModifiedDate);
                //   this.form.get('Priority').setValue(this.task.Priority);
                // }

              }
            );
        }
      }
    );
  }

  onStatusChange(newStatusValue) {
    this.selectedStatusValue = newStatusValue;
  }

  onPriorityChange(newPriorityValue) {
    this.selectedPriorityValue = newPriorityValue;
  }

  onSubmit() {

    console.log('form', this.form);

    if (this.form.valid) {
      console.log('form is valid');
    } else {
      this.checkFormValidators(this.form);
    }
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

  checkEmailInvalid() {
    const emailField = this.form.get('email');
    if (emailField.errors) {
      return emailField.errors['email'] && emailField.touched;
    }
  }

  // implements from iform-candeactivate
  canExitPage() {
    if (this.isFormDirty(this.form)) {
      return confirm('Are you sure you want to exit the page?');
    }
    return true;
  }

  private isFormDirty(formGroup: FormGroup) {
    let result = false;
    Object.keys(formGroup.controls).forEach(name => {
      const control = formGroup.get(name);
      if (control.dirty) {
        result = true;
      }
      if (control instanceof FormGroup && result === false) {
        this.isFormDirty(control);
      }
    });

    return result;
  }

  private resetForm() {
    this.form.reset();

    // set default Due Date to next month
    const today = new Date();
    today.setMonth(today.getMonth() + 1);
    const dueDateYear = today.getFullYear();
    const dueDateMonth = today.getMonth();
    const dueDateDay = today.getDate();

    today.setMonth(today.getMonth() - 1);
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDay = today.getDate();

    this.form.patchValue({
      DueDate: moment([dueDateYear, dueDateMonth, dueDateDay]),
      CreatedDate: moment([todayYear, todayMonth, todayDay]),
      Title: '',
      Description: '',
      Status: '0',
      Priority: '0'
    });
  }

  ngOnDestroy() {
    if (this.paramSubscription != null) {
      this.paramSubscription.unsubscribe();
    }
    if (this.taskSubscription != null) {
      this.taskSubscription.unsubscribe();
    }
  }
}
