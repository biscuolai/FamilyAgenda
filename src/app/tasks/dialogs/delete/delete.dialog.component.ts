import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';

import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: '../../dialogs/delete/delete.dialog.html',
  styleUrls: ['../../dialogs/delete/delete.dialog.css']
})
export class DeleteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public tasksService: TasksService,
    private toastr: ToastrService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.tasksService.deleteItem(this.data.id)
      .pipe(tap(console.log))
      .subscribe(data => {
        this.toastr.success('Delete Task', 'Successfully deleted!');
      },
      (err: HttpErrorResponse) => {
        this.toastr.error('Delete Task', 'Error occurred. Details: ' + err.name + ' ' + err.message);
      });
  }
}
