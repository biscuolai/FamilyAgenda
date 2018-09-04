// import { FormDebugComponent } from './shared/form-debug/form-debug.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { AuthService } from './auth/auth.service';
import { AppRoutingModule } from './app.routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { TaskDatagridComponent } from './tasks/task-datagrid/task-datagrid.component';
import { SharedModule } from './shared/shared.module';
// import { TaskDatagridBackendComponent } from './tasks/task-datagrid-backend/task-datagrid-backend.component';

import {
  MatExpansionModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule,
  MatListModule, MatTableModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule,
  MatFormFieldModule, MatRippleModule, MatNativeDateModule, MatGridListModule, MatCardModule,
  MatMenuModule, MatRadioModule, MatTabsModule, MatDialogModule
} from '@angular/material';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AuthModule } from './auth/auth.module';
import { TaskDatagrid2Component } from './tasks/task-datagrid/task-datagrid2.component';
import { AddDialogComponent } from './tasks/dialogs/add/add.dialog.component';
import { EditDialogComponent } from './tasks/dialogs/edit/edit.dialog.component';
import { DeleteDialogComponent } from './tasks/dialogs/delete/delete.dialog.component';
// import { TaskFormComponent } from './tasks/task-form/task-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavigationComponent,
    PageNotFoundComponent,
    TaskDatagridComponent,
    // TaskDatagridBackendComponent
    TaskDatagrid2Component,
    DeleteDialogComponent,
    EditDialogComponent,
    AddDialogComponent,
    // TaskFormComponent,
    // FormDebugComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,

    ToastrModule.forRoot(), // ToastrModule added

    AppRoutingModule,
    AuthModule,
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
    MatDialogModule
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DeleteDialogComponent,
    EditDialogComponent,
    AddDialogComponent
  ]
})
export class AppModule { }
