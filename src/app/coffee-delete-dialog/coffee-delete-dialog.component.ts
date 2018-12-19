import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Mode, CoffeeConfirmation } from '../CoffeeConfirmation';
import { CoffeeService } from '../coffee.service';
import { stringify } from '@angular/core/src/render3/util';

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

  ngOnInit() {

    if (this.coffeeId === 'undefined') {
      this.snackBar.open('Sorry this is not a valid Coffee obejct.');
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  /**  */
  onOkClick(): void {
    this.dialogRef.close();
    this.coffeeService.deleteCoffee(this.coffeeId);
    // this.router.navigate(['/coffee-data-list']);
  }

}
