import { Component, OnInit, OnDestroy  } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute  } from '@angular/router';
import { CoffeeService } from '../coffee.service';
import { MatDialog } from '@angular/material';
import { ICoffee } from '../ICoffee';
import { Observable } from 'rxjs';
import { CoffeeEditConfirmationComponent } from '../coffee-edit-confirmation/coffee-edit-confirmation.component';
import { Mode } from '../ICoffeeConfirmation';

@Component({
  selector: 'app-coffee-edit',
  templateUrl: './coffee-edit.component.html',
  styleUrls: ['./coffee-edit.component.css']
})
export class CoffeeEditComponent implements OnInit, OnDestroy {

  description = new FormControl('', [Validators.required]);
  date = new FormControl('', [Validators.required]);
  id: string;
  private sub: any;
  coffeeDescription: string;
  coffeeDate: Date;
  coffeeObservable: Observable <ICoffee> ;
  coffeeDocToEdit: ICoffee;
  mode: Mode;

  constructor(
    private route: ActivatedRoute,
    private coffeeService: CoffeeService,
    public dialog: MatDialog
    ) {
    this.route.params.subscribe();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.coffeeObservable = this.coffeeService.getCoffee(this.id).valueChanges();
    this.coffeeObservable.subscribe(coffee => {
      this.coffeeDescription = coffee.description;
      this.coffeeDate = coffee.date;

      // Initialize the CoffeeToEdit here so that it is not null
      this.coffeeDocToEdit = coffee;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getErrorMessage(validator: FormControl) {
    return validator.hasError('required') ? 'You must enter a value' : '';
  }

  /** If any validation Errors then Disable the button */
  disableSubmitButton() {
    if (this.description.hasError('required') || this.date.hasError('required')) {
      return true;
    } else {
      return false;
    }
  }

  /** Edit Coffee */
  editCoffee() {

    this.coffeeDocToEdit.description = this.coffeeDescription;
    this.coffeeDocToEdit.date = this.coffeeDate;
    this.mode = Mode.Edit;
    this.confirmDialog();
  }

  /** Delete Coffee */
  deleteCoffee() {
    console.log(this.id);
    this.mode = Mode.Delete;
    this.confirmDialog();
  }

  /**
   * Pass the necessary info into the CoffeeEditConfirmationComponent.
   * Depending on the Mode, this will either Edit or Delete the current Coffee Object.
   */
  confirmDialog(): void {
    const dialogRef = this.dialog.open(CoffeeEditConfirmationComponent, {
      width: '80%',
      maxWidth: '450px',
      data: {mode: this.mode, coffee: this.coffeeDocToEdit}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }
}
