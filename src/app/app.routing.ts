import { TaskNotFoundComponent } from './tasks/task-not-found/task-not-found.component';
import { Routes, RouterModule } from '@angular/router';

import { TasksComponent } from './tasks/tasks.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ModuleWithProviders } from '@angular/core';
import { TaskDetailComponent } from './tasks/task-detail/task-detail.component';

const appRoutes: Routes = [
    { path: 'tasks', component: TasksComponent },
    { path: 'tasks/:id', component: TaskDetailComponent },
    { path: 'login', component: LoginComponent },
    { path: 'tasknotfound', component: TaskNotFoundComponent },
    { path: '', component: HomeComponent }
];

export const rootRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);