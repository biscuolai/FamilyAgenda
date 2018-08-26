import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { AuthService } from './auth/auth.service';
import { AppRoutingModule } from './app.routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { TaskDatagridComponent } from './tasks/task-datagrid/task-datagrid.component';
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
import { DeleteDialogComponent } from './shared/delete-dialog/delete-dialog.component';
import { TaskDatagrid2Component } from './tasks/task-datagrid/task-datagrid2.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavigationComponent,
    PageNotFoundComponent,
    TaskDatagridComponent,
    DeleteDialogComponent,
    // TaskDatagridBackendComponent
    TaskDatagrid2Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,

    AppRoutingModule,
    AuthModule,

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
  entryComponents: [DeleteDialogComponent]
})
export class AppModule { }
