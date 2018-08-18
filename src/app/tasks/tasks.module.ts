import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TasksComponent } from './tasks.component';
import { TasksService } from './tasks.service';
import { MatListModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatSelectModule } from '@angular/material';
import { TaskNotFoundComponent } from './task-not-found/task-not-found.component';
import { TasksRoutingModule } from './tasks.routing.module';
import { TaskFormComponent } from './task-form/task-form.component';
import { FormDeactivateGuard } from './../guards/form-deactivate.guard';
import { FormDebugComponent } from './../shared/form-debug/form-debug.component';
import { TaskDetailsResolverGuard } from './../guards/task-details.resolver';

@NgModule({
    declarations: [ 
        TasksComponent,
        TaskDetailComponent,
        TaskNotFoundComponent,
        TaskFormComponent,
        FormDebugComponent
    ],
    imports: [ 
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,

        TasksRoutingModule,

        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        MatDatepickerModule,        
        MatSelectModule,
    ],
    exports: [],
    providers: [
        TasksService,
        FormDeactivateGuard,
        TaskDetailsResolverGuard
    ],
})
export class TasksModule {}