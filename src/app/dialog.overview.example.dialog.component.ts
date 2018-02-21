import { Component, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { MatProgressBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Injectable, Inject } from '@angular/core';



@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './html/dialog-overview-example-dialog.html',
})

export class DialogOverviewExampleDialogComponent {

    constructor(
      public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {}

    onNoClick(): void {
      this.dialogRef.close();
    }
}