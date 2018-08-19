import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { TasksService } from '../tasks.service';
import { Task } from '../../shared/task';
import { IFormCanDeactivate } from '../../guards/iform-candeactivate';
import { Status, Priority } from './../../shared/task';

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
export class TaskFormComponent implements OnInit, IFormCanDeactivate {

  form: FormGroup;
  subscription: Subscription;
  task: Task;
  id: string;
  selectedStatus: any;
  selectedPriority: any;
  selectedStatusValue: string = '0';
  selectedPriorityValue: string = '0';

  statuses: Status[] = [
    { value: '0', viewValue: 'New' },
    { value: '1', viewValue: 'Reviewing' },
    { value: '2', viewValue: 'In Progress' },
    { value: '3', viewValue: 'Completed' },
    { value: '4', viewValue: 'Cancelled' }
  ];

  priorities: Priority[] = [
    { value: '0', viewValue: "Low" },
    { value: '1', viewValue: "Medium" },
    { value: '2', viewValue: "High" },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private tasksService: TasksService,
    private router: Router,
    private adapter: DateAdapter<any>
  ) { }

  ngOnInit() {
    // set default Due Date to next month
    let today = new Date();
    today.setMonth(today.getMonth() + 1);
    let year = today.getFullYear();
    let month = today.getMonth();
    let day = today.getDate();

    this.form = this.formBuilder.group({
      Id: ['', null],
      Title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      Description: ['', null],
      DueDate: [moment([year, month, day]), Validators.required],
      Status: ['', Validators.required],
      Priority: ['', Validators.required],
      CreatedDate: ['', null],
      LastModifiedDate: ['', null],
      AssignedTo: ['', null]
    });

    // set location of DatePicker for English-Australia dd/MM/yyyy
    this.adapter.setLocale('en-AU');

    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];

        // no param id has been passed, therefore it is not edit mode
        if (this.id === undefined){
          this.form.reset();
        }
        else{
          this.task = this.tasksService.getTask(this.id);

          console.log('task returned', this.task);

          // if task was found and returned data
          if (this.task !== null)
          {
            this.form.get('Id').setValue(this.task['Id']);
            this.form.get('Title').setValue(this.task.Title);
            this.form.get('Description').setValue(this.task.Description);
            this.form.get('DueDate').setValue(this.task.DueDate);
            this.form.get('AssignedTo').setValue(this.task.AssignedTo);
            this.form.get('Status').setValue(this.task.Status);
            this.form.get('CreatedDate').setValue(this.task.CreatedDate);
            this.form.get('LastModifiedDate').setValue(this.task.LastModifiedDate);
            this.form.get('Priority').setValue(this.task.Priority);
          }
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();  
  }

  onStatusChange(newStatusValue) {
    this.selectedStatusValue = newStatusValue;
  }

  onPriorityChange(newPriorityValue) {
    this.selectedPriorityValue = newPriorityValue;
  }

  onSubmit() {

    console.log('form', this.form);
    
    if (this.form.valid){
      console.log('form is valid');
    }
    else{
      this.validateForm(this.form);
    }
  }

  validateForm(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(name => {
      console.log(name);
      const control = formGroup.get(name);
      control.markAsDirty();
      if (control instanceof FormGroup){
        this.validateForm(control);
      }
    })
  }

  checkValidTouched(fieldName) {
    return !this.form.get(fieldName).valid && (this.form.get(fieldName).touched || this.form.get(fieldName).dirty);
  }

  // implements from iform-candeactivate 
  canExitPage() {
    if (this.isFormDirty(this.form)){
      return confirm('Are you sure you want to exit the page?');
    }
    return true;
  }

  private isFormDirty(formGroup: FormGroup) {
    let result: boolean = false;
    Object.keys(formGroup.controls).forEach(name => {
      const control = formGroup.get(name);
      if (control.dirty) {
        result = true;
      }
      if (control instanceof FormGroup && result == false) {
        this.isFormDirty(control);
      }
    })
    return result;
  }

}
