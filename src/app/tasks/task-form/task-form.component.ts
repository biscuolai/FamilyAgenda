import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../tasks.service';
import { Task } from '../../shared/task';
import { IFormCanDeactivate } from '../../guards/iform-candeactivate';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit, IFormCanDeactivate {

  form: FormGroup;
  subscription: Subscription;
  task: Task;
  id: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private tasksService: TasksService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      Id: ['', null],
      Name: ['', null]
    });

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
            this.form.get('Name').setValue(this.task.Name);
          }
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();  
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
