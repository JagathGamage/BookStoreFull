import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation-dialog',
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrls: ['./delete-confirmation-dialog.component.css']
})
export class DeleteConfirmationDialogComponent {
  constructor(public dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>) {}

  onConfirm(): void {
    this.dialogRef.close(true); // Pass true if the user confirms deletion
  }

  onCancel(): void {
    this.dialogRef.close(false); // Pass false if the user cancels
  }
}
