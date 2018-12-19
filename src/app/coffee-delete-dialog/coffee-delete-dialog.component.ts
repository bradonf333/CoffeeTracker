import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { CoffeeService } from '../coffee.service';

@Component({
  selector: 'app-coffee-delete-dialog',
  templateUrl: './coffee-delete-dialog.component.html',
  styleUrls: ['./coffee-delete-dialog.component.scss']
})
export class CoffeeDeleteDialogComponent implements OnInit {

  coffeeId: string;

  constructor(
    public dialogRef: MatDialogRef<CoffeeDeleteDialogComponent>,
    public snackBar: MatSnackBar,
    private coffeeService: CoffeeService,
    @Inject(MAT_DIALOG_DATA) public id, private router: Router) {
      this.coffeeId = id.coffeeId;
    }

  ngOnInit() { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  /** Confirm Delete Button click */
  onOkClick(): void {
    this.dialogRef.close();
    this.coffeeService.deleteCoffee(this.coffeeId);
  }

}
