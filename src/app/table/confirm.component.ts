import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-dialog-overview-example-dialog',
    template: `<h1 mat-dialog-title>Confirm</h1>
  <div mat-dialog-content>
    <p>Do you really want to delete?</p>
  </div>
  <div class="text-right m-t-20">
    <button mat-button [mat-dialog-close]=true tabindex="2">Ok</button>
    <button mat-button (click)="onNoClick()" tabindex="-1" class="m-l-10">Cancel</button>
  </div>`
  })
  export class ConfirmComponent {
    constructor(
      public dialogRef: MatDialogRef<ConfirmComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  }