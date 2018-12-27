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

  // Routing
  id: string;
  private sub: any;

  // Form Values
  coffeeName: string;
  coffeeRoaster: string;
  coffeeRoastDate = moment().format('MM/DD/YYYY');
  coffeeRegions: string;    // TODO: Need to figure out how to make this a list on the input.
  coffeeRating: number;
  coffeeFlavors: string;
  coffeeNotes: string;

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
    if (this.id === 'undefined') {

      // If undefined, then re-route because it is an error.
      // TODO: Create an error page/component.
      this.router.navigate(['']);
    } else {

      const coffeeObservable = this.coffeeService.getCoffee(this.id).valueChanges();
      coffeeObservable.subscribe(coffee => {

        console.log('Coffee: ', coffee);

        // Bind the form values to the Coffee from the DB.
        this.coffeeName = coffee.name;
        this.coffeeRoaster = coffee.roaster;
        this.coffeeRoastDate = moment(coffee.roastDate).format('MM/DD/YYYY');
        [this.coffeeRegions] = coffee.regions;
        this.coffeeFlavors = coffee.flavors;
        this.coffeeRating = coffee.rating;
        this.coffeeNotes = coffee.notes;
      });
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
