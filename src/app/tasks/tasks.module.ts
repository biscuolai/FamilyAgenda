import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TasksComponent } from './tasks.component';
import { TasksService } from './services/tasks.service';

import {
  MatExpansionModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule,
  MatListModule, MatTableModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule,
  MatFormFieldModule, MatRippleModule, MatNativeDateModule, MatGridListModule, MatCardModule,
  MatMenuModule, MatRadioModule, MatTabsModule, MatStepperModule, MatDialogModule
} from '@angular/material';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { ToastrModule, ToastContainerModule } from 'ngx-toastr';

import { TaskNotFoundComponent } from './task-not-found/task-not-found.component';
import { TasksRoutingModule } from './tasks.routing.module';
import { TaskFormComponent } from './task-form/task-form.component';
import { FormDeactivateGuard } from '../guards/form-deactivate.guard';
import { TaskDetailsResolverGuard } from '../guards/task-details.resolver';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  declarations: [
    TasksComponent,
    TaskDetailComponent,
    TaskNotFoundComponent,
    TaskFormComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    ToastrModule.forRoot(),
    ToastContainerModule,

    TasksRoutingModule,
    SharedModule,

    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatDatepickerModule,        // <----- import(must)
    MatNativeDateModule,         // <----- import(optional)
    MatSelectModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatRadioModule,
    MatExpansionModule,
    MatTabsModule,
    MatStepperModule,
    MatDialogModule
  ],
  exports: [
    TaskFormComponent,
    //DeleteDialogComponent,
    //EditDialogComponent,
    //AddDialogComponent
  ],
  providers: [
    TasksService,
    FormDeactivateGuard,
    TaskDetailsResolverGuard
  ]
})
export class TasksModule { }
