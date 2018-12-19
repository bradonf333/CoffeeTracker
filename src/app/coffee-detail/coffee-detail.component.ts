import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoffeeService } from '../coffee.service';
import { MatDialog } from '@angular/material';
import { CoffeeEditConfirmationComponent } from '../coffee-edit-confirmation/coffee-edit-confirmation.component';
import { Mode, CoffeeConfirmation } from '../CoffeeConfirmation';
import * as moment from 'moment';

@Component({
  selector: 'app-coffee-detail',
  templateUrl: './coffee-detail.component.html',
  styleUrls: ['./coffee-detail.component.scss']
})
export class CoffeeDetailComponent implements OnInit, OnDestroy {

  now = moment().format();
  mode: Mode;

  // Form Validators
  description = new FormControl('', [Validators.required]);
  date = new FormControl('', [Validators.required]);

  // Routing
  id: string;
  private sub: any;

  // Form Values
  coffeeDescription: string;
  coffeeDate = moment().format('MM/DD/YYYY');

  // Coffee and Edit Object used to edit or delete the coffee.
  coffeeConfirmation: CoffeeConfirmation;

  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private coffeeService: CoffeeService,
    public dialog: MatDialog
  ) {
    this.actRoute.params.subscribe();
  }

  ngOnInit() {
    this.sub = this.actRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
    });

    /*
     * If this is a new Coffee, create a new object.
     * If undefined, then re-route to home page.
     * If it is an existing Coffee, get all the information for that object.
     */
    if (this.id === 'new') {

      // At this point the form will be blank, so these form values will be empty.
      this.coffeeConfirmation = {
        coffee: {
          description: this.coffeeDescription,
          date: moment(this.coffeeDate).format('MM/DD/YYYY')
        },
        mode: Mode.Add
      };
      this.mode = Mode.Add;
    } else if (this.id === 'undefined') {

      // If undefined, then re-route because it is an error.
      // TODO: Create an error page/component.
      this.router.navigate(['']);
    } else {

      const coffeeObservable = this.coffeeService.getCoffee(this.id).valueChanges();
      coffeeObservable.subscribe(coffee => {

        // Bind the form values to the Coffee from the DB.
        this.coffeeDescription = coffee.description;

        // In order for the Material Datepicker to handle the date, needs to use ISOString.
        this.coffeeDate = moment(coffee.date).format('MM/DD/YYYY');

        // Initialize the Coffee Objects here so that they are not null.
        this.coffeeConfirmation = {
          coffee: coffee,
          mode: Mode.None
        };
      });

      this.mode = Mode.Edit;
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
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
    this.coffeeConfirmation.coffee.date = moment(this.coffeeDate).format('MM/DD/YYYY');
    this.coffeeConfirmation.coffee.description = this.coffeeDescription;

    if (this.id === 'new') {
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