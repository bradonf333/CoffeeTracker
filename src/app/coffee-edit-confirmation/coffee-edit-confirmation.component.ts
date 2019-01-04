import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CoffeeConfirmation } from '../Models/CoffeeConfirmation';
import { Mode } from '../Models/CoffeeConfirmation';
import { CoffeeService } from '../Services/coffee.service';
import { Coffee } from '../Models/Coffee';

/**
 * MatDialog Componenet used to confirm editing a coffee before calling
 * the service to make the edit in the database.
 */
@Component({
  selector: 'app-coffee-edit-confirmation',
  templateUrl: 'coffee-edit-confirmation.component.html',
  styleUrls: ['./coffee-edit-confirmation.component.css']
})
export class CoffeeEditConfirmationComponent implements OnInit {
  mode: Mode;
  coffeeToUpdate: Coffee;
  coffeeId: string;

  constructor(
    public dialogRef: MatDialogRef<CoffeeEditConfirmationComponent>,
    private coffeeService: CoffeeService,
    @Inject(MAT_DIALOG_DATA) public coffeeConfirmation: CoffeeConfirmation,
    private router: Router
  ) {}

  ngOnInit() {
    this.mode = this.coffeeConfirmation.mode;
    this.coffeeToUpdate = this.coffeeConfirmation.coffee;
    this.coffeeId = this.coffeeConfirmation.coffee.id;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * When the  Accept button is pressed determines whether to add or update a Coffee.
   * After calling the service, route back to the Coffee Data List.
   */
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
