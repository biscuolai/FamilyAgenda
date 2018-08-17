import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Task } from './../shared/task';
import { TasksService } from '../tasks/tasks.service';

@Injectable()
export class TaskDetailsResolverGuard implements Resolve<Task> {

    constructor(
        private taskService: TasksService,
        private router: Router
    ){

    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        let id = route.params['id'];
        console.log('route.params[id]', route.params['id']);
        let task = this.taskService.getTask(id);
        console.log('task', task);
        return task;
    }
}
