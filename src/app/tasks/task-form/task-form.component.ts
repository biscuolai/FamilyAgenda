import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  form: FormGroup;
  subscription: Subscription;
  task: any;
  id: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private tasksService: TasksService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: ['', null],
      name: ['', null]
    });

    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];
        this.task = this.tasksService.getTask(this.id);

        if (this.task === null){
          this.task = {};
        }
      }
    );

    //this.form.get('id').disable();
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

}
