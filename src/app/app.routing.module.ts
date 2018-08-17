import { NgModule } from "@angular/core";
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from "./guards/auth.guard";
import { TasksGuard } from "./guards/tasks.guard";

const appRoutes: Routes = [
    { path: 'tasks', 
        loadChildren: './tasks/tasks.module#TasksModule',
        canActivate: [AuthGuard],
        canActivateChild: [TasksGuard]
    },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LoginComponent },
    { path: '', 
        component: HomeComponent,
        canActivate: [AuthGuard] 
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}