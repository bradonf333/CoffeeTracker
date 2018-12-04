import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ICoffee } from '../ICoffee';

@Component({
  selector: 'app-coffee-edit-confirmation',
  templateUrl: 'coffee-edit-confirmation.component.html',
  styleUrls: ['./coffee-edit-confirmation.component.css'],
})
export class CoffeeEditConfirmationComponent {

  constructor(
    public dialogRef: MatDialogRef<CoffeeEditConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICoffee, private router: Router) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(): void {
    this.dialogRef.close();
    this.router.navigate(['/coffee-data-list']);
  }
}
