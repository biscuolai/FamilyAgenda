import { NgModule } from "@angular/core";
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TasksComponent } from './tasks.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskNotFoundComponent } from './task-not-found/task-not-found.component';
import { TaskFormComponent } from "./task-form/task-form.component";

const tasksRoutes: Routes = [
    { path: '', component: TasksComponent, children: [
        { path: 'new', component: TaskFormComponent },
        { path: 'notfound', component: TaskNotFoundComponent },
        { path: ':id', component: TaskDetailComponent },
        { path: ':id/edit', component: TaskFormComponent }
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(tasksRoutes)],
    exports: [RouterModule]
})
export class TasksRoutingModule {}