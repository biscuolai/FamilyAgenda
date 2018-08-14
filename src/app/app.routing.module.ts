import { NgModule } from "@angular/core";
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskDetailComponent } from './tasks/task-detail/task-detail.component';
import { TaskNotFoundComponent } from './tasks/task-not-found/task-not-found.component';

const appRoutes: Routes = [
    { path: 'tasks', component: TasksComponent },
    { path: 'tasks/:id', component: TaskDetailComponent },
    { path: 'login', component: LoginComponent },
    { path: 'tasknotfound', component: TaskNotFoundComponent },
    { path: '', component: HomeComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}