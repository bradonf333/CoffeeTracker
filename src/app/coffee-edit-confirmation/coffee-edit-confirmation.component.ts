import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CoffeeConfirmation } from '../CoffeeConfirmation';
import { Mode } from '../CoffeeConfirmation';
import { CoffeeService } from '../coffee.service';
import { Coffee } from '../Coffee';

@Component({
  selector: 'app-coffee-edit-confirmation',
  templateUrl: 'coffee-edit-confirmation.component.html',
  styleUrls: ['./coffee-edit-confirmation.component.css'],
})
export class CoffeeEditConfirmationComponent implements OnInit {

  mode: Mode;
  coffeeToUpdate: Coffee;
  coffeeId: string;

  constructor(
    public dialogRef: MatDialogRef<CoffeeEditConfirmationComponent>,
    private coffeeService: CoffeeService,
    @Inject(MAT_DIALOG_DATA) public coffeeConfirmation: CoffeeConfirmation, private router: Router) {}

    ngOnInit() {

      console.log(this.coffeeConfirmation);
      this.mode = this.coffeeConfirmation.mode;
      this.coffeeToUpdate = this.coffeeConfirmation.coffee;
      this.coffeeId = this.coffeeConfirmation.coffee.id;

      console.log(this.coffeeToUpdate);
    }

    onNoClick(): void {
      this.dialogRef.close();
  }

  /**  */
  onOkClick(): void {
    this.dialogRef.close();

    if (this.mode === Mode.Edit) {
      this.coffeeService.updateCoffee(this.coffeeId, this.coffeeToUpdate);
    } else if (this.mode === Mode.Add) {
      this.coffeeService.addCoffee(this.coffeeToUpdate);
    }
    this.router.navigate(['/coffee-data-list']);
  }
}

