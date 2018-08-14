import { TasksService } from './../tasks.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {

  id: number;
  subscription: Subscription;
  task: any;

  constructor(
    private route: ActivatedRoute,
    private tasksService: TasksService,
    private router: Router
  ) { 
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];
        this.task = this.tasksService.getTask(this.id);

        if (this.task == null){
          this.router.navigate(['/tasknotfound']);
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();  
  }

}
