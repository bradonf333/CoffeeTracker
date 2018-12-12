import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ICoffeeConfirmation } from '../ICoffeeConfirmation';
import { Mode } from '../ICoffeeConfirmation';
import { CoffeeService } from '../coffee.service';
import { ICoffee } from '../ICoffee';

@Component({
  selector: 'app-coffee-edit-confirmation',
  templateUrl: 'coffee-edit-confirmation.component.html',
  styleUrls: ['./coffee-edit-confirmation.component.css'],
})
export class CoffeeEditConfirmationComponent implements OnInit {

  mode: Mode;
  coffeeToUpdate: ICoffee;
  coffeeId: string;

  constructor(
    public dialogRef: MatDialogRef<CoffeeEditConfirmationComponent>,
    private coffeeService: CoffeeService,
    @Inject(MAT_DIALOG_DATA) public data: ICoffeeConfirmation, private router: Router) {}

    ngOnInit() {
      console.log(this.data.coffee);
      console.log(this.data);
      this.mode = this.data.mode;
      this.coffeeToUpdate = this.data.coffee;
      this.coffeeId = this.data.coffee.id;
    }

    onNoClick(): void {
      this.dialogRef.close();
  }

  onOkClick(): void {
    this.dialogRef.close();
    if (this.mode === Mode.Edit) {
      this.coffeeService.updateCoffee(this.coffeeId, this.coffeeToUpdate);
    } else if (this.mode === Mode.Delete) {
      this.coffeeService.deleteCoffee(this.coffeeId);
    }
    this.router.navigate(['/coffee-data-list']);
  }
}

