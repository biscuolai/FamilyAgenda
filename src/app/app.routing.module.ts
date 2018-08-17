import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from "./guards/auth.guard";
import { TasksGuard } from "./guards/tasks.guard";

const appRoutes: Routes = [
    { path: 'tasks', 
        loadChildren: './tasks/tasks.module#TasksModule',
        canActivate: [AuthGuard],
        canActivateChild: [TasksGuard],
        canLoad: [AuthGuard]
    },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LoginComponent },
    { path: 'home', 
        component: HomeComponent,
        canActivate: [AuthGuard] 
    },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}