import { Routes, RouterModule } from '@angular/router';

import { TasksComponent } from './tasks/tasks.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ModuleWithProviders } from '../../node_modules/@angular/core';

const appRoutes: Routes = [
    { path: 'tasks', component: TasksComponent },
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent }
];

export const rootRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);