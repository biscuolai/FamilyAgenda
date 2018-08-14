import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TasksComponent } from './tasks.component';
import { TasksService } from './tasks.service';
import { MatListModule } from '@angular/material';
import { TaskNotFoundComponent } from './task-not-found/task-not-found.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
    declarations: [ 
        TasksComponent,
        TaskDetailComponent,
        TaskNotFoundComponent 
    ],
    imports: [ 
        CommonModule,
        MatListModule,
        RouterModule,
        FormsModule,
        HttpClientModule
    ],
    exports: [ ],
    providers: [TasksService],
})
export class TasksModule {}