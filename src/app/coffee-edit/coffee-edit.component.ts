import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoffeeService } from '../coffee.service';
import { MatDialog } from '@angular/material';
import { CoffeeEditConfirmationComponent } from '../coffee-edit-confirmation/coffee-edit-confirmation.component';
import { Mode, CoffeeConfirmation, CoffeeConfirmation2 } from '../CoffeeConfirmation';
import * as moment from 'moment';
import { validateBasis } from '@angular/flex-layout';

@Component({
  selector: 'app-coffee-edit',
  templateUrl: './coffee-edit.component.html',
  styleUrls: ['./coffee-edit.component.scss']
})
export class CoffeeEditComponent implements OnInit, OnDestroy {

  mode: Mode;

  // Form Validators
  name = new FormControl('', [Validators.required]);
  roaster = new FormControl('', [Validators.required]);
  roastDate = new FormControl('', [Validators.required]);
  regions = new FormControl('', [Validators.required]);
  rating = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);
  notes = new FormControl('', [Validators.maxLength(255)]);
  // date = new FormControl('', [Validators.required]);

  // Routing
  id: string;
  private sub: any;

  // Form Values
  coffeeName: string;
  coffeeRoaster: string;
  coffeeRoastDate = moment().format('MM/DD/YYYY');
  coffeeRegions: string;    // TODO: Need to figure out how to make this a list on the input.
  coffeeRating: number;
  coffeeDescription: string;
  coffeeNotes: string;

  // Coffee and Edit Object used to edit or delete the coffee.
  coffeeConfirmation: CoffeeConfirmation2;

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
          name: this.coffeeName,
          roaster: this.coffeeRoaster,
          roastDate: moment(this.coffeeRoastDate).format('MM/DD/YYYY'),
          regions: [this.coffeeRegions],
          description: this.coffeeDescription,
          rating: this.coffeeRating,
          notes: this.coffeeNotes
        },
        mode: Mode.Add
      };
      this.mode = Mode.Add;
    } else if (!this.id) {

      // If undefined, then re-route because it is an error.
      // TODO: Create an error page/component.
      this.router.navigate(['']);
    } else {

      const coffeeObservable = this.coffeeService.getCoffee2(this.id).valueChanges();
      coffeeObservable.subscribe(coffee => {

        // Bind the form values to the Coffee from the DB.
        this.coffeeName = coffee.name;
        this.coffeeRoaster = coffee.roaster;
        // In order for the Material Datepicker to handle the date, needs to use ISOString.
        this.coffeeRoastDate = moment(coffee.roastDate).toISOString();
        [this.coffeeRegions] = coffee.regions;
        this.coffeeDescription = coffee.description;
        this.coffeeRating = coffee.rating;
        this.coffeeNotes = coffee.notes;

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

  getErrorMessage(validator: FormControl) {
    if (validator.hasError('required')) {
      return 'You must enter a value';
    } else if (validator.hasError('maxlength')) {
      return 'You have exceeded the Max Length';
    } else {
      return '';
    }
  }

  /** If any validation Errors then Disable the button */
  disableButton() {
    if (this.name.hasError('required')
    || this.roaster.hasError('required')
    || this.roastDate.hasError('required')
    || this.regions.hasError('required')
    || this.rating.hasError('required')
    || this.description.hasError('required')
    || this.notes.hasError('maxlength')) {
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

  /** Set the necessary values for the Coffee to be modified */
  setCoffeeAndMode() {
    this.coffeeConfirmation.coffee.name = this.coffeeName;
    this.coffeeConfirmation.coffee.roaster = this.coffeeRoaster;
    this.coffeeConfirmation.coffee.roastDate = moment(this.coffeeRoastDate).format('MM/DD/YYYY');
    this.coffeeConfirmation.coffee.regions = [this.coffeeRegions];
    this.coffeeConfirmation.coffee.description = this.coffeeDescription;
    this.coffeeConfirmation.coffee.rating = this.coffeeRating;
    this.coffeeConfirmation.coffee.notes = this.coffeeNotes ? this.coffeeNotes : '';

    if (this.id === 'new') {
      this.coffeeConfirmation.mode = Mode.Add;
    } else {
      this.coffeeConfirmation.coffee.id = this.id;
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
