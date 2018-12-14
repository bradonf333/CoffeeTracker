import { Component, OnInit, OnDestroy  } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute  } from '@angular/router';
import { CoffeeService } from '../coffee.service';
import { MatDialog } from '@angular/material';
import { CoffeeEditConfirmationComponent } from '../coffee-edit-confirmation/coffee-edit-confirmation.component';
import { Mode, ICoffeeConfirmation } from '../ICoffeeConfirmation';

@Component({
  selector: 'app-coffee-edit',
  templateUrl: './coffee-edit.component.html',
  styleUrls: ['./coffee-edit.component.css']
})
export class CoffeeEditComponent implements OnInit, OnDestroy {

  // Form Validators
  description = new FormControl('', [Validators.required]);
  date = new FormControl('', [Validators.required]);

  // Routing
  id: string;
  private sub: any;

  // Form Values
  coffeeDescription: string;
  coffeeDate: Date;

  // Coffee and Edit Object used to edit or delete the coffee
  coffeeConfirmation: ICoffeeConfirmation;

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

    /*
     * If this is a new Coffee, create a new object.
     * If it is an existing Coffee, get all the information for that object.
     */
    if (this.id === '0') {

      // At this point the form will be blank, so these form values will be empty.
      this.coffeeConfirmation = {
        coffee: {
          description: this.coffeeDescription,
          date: this.coffeeDate
        },
        mode: Mode.None
      };
    } else {

      const coffeeObservable = this.coffeeService.getCoffee(this.id).valueChanges();
      coffeeObservable.subscribe(coffee => {

        // Bind the form values to the Coffee from the DB.
        this.coffeeDescription = coffee.description;
        this.coffeeDate = coffee.date;

        // Initialize the Coffee Objects here so that they are not null
        this.coffeeConfirmation = {
          coffee: coffee,
          mode: Mode.None
        };
      });
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getErrorMessage(validator: FormControl) {
    return validator.hasError('required') ? 'You must enter a value' : '';
  }

  /** If any validation Errors then Disable the button */
  disableButton() {
    if (this.description.hasError('required') || this.date.hasError('required')) {
      return true;
    } else {
      return false;
    }
  }

  /** Add or Edit Coffee */
  submitCoffee() {
    this.setCoffeeAndMode();
    this.confirmDialog();
  }

  /** Delete Coffee */
  deleteCoffee() {
    this.coffeeConfirmation.mode = Mode.Delete;
    this.confirmDialog();
  }

  /** Set the necessary values for the Coffee to be modified */
  setCoffeeAndMode() {
    this.coffeeConfirmation.coffee.date = this.coffeeDate;
    this.coffeeConfirmation.coffee.description = this.coffeeDescription;
    if (this.id === '0') {
      this.coffeeConfirmation.mode = Mode.Add;
    } else {
      this.coffeeConfirmation.mode = Mode.Edit;
    }
  }

  /**
   * Pass the necessary info into the CoffeeEditConfirmationComponent.
   * Depending on the Mode, this will either Edit or Delete the current Coffee Object.
   */
  confirmDialog(): void {
    const dialogRef = this.dialog.open(CoffeeEditConfirmationComponent, {
      width: '80%',
      maxWidth: '450px',
      /*
      * NOTE: The Object passed to the dialogRef has to be called data.
      * However you can build this data object however you want.
      * I want this data object to follow the model of my ICoffeeConfirmation interface.
      * Then in the CoffeeEditConfirmationComponent it can now receive an ICoffeeConfirmation object and be strongly
      */
      data: {
        coffee: this.coffeeConfirmation.coffee,
        mode: this.coffeeConfirmation.mode
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }
}
