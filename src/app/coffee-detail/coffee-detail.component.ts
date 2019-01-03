import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoffeeService } from '../Services/coffee.service';
import { MatDialog } from '@angular/material';
import { Mode, CoffeeConfirmation } from '../Models/CoffeeConfirmation';
import * as moment from 'moment';
import { WeatherService } from '../Services/weather.service';

@Component({
  selector: 'app-coffee-detail',
  templateUrl: './coffee-detail.component.html',
  styleUrls: ['./coffee-detail.component.scss']
})
export class CoffeeDetailComponent implements OnInit, OnDestroy {

  mode: Mode;
  undefinedId = 'undefined';

  // Routing
  id: string;
  private sub: any;

  // Form Values
  coffeeName: string;
  coffeeRoaster: string;
  coffeeRoastDate = moment().format('MM/DD/YYYY');
  coffeeRegions: string[] = [];
  coffeeRating: number;
  coffeeFlavors: string[] = [];
  coffeeNotes: string;

  // Grid Values
  totalCols = 5;
  labelColspan = 1;
  dataColspan = this.totalCols - this.labelColspan;

  // Weather Object
  // TODO: Create an Interface for this object later.
  weather: any;

  // Coffee and Edit Object used to edit or delete the coffee.
  coffeeConfirmation: CoffeeConfirmation;

  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private coffeeService: CoffeeService,
    private weatherService: WeatherService,
    public dialog: MatDialog
  ) {
    this.actRoute.params.subscribe();
  }

  ngOnInit() {
    this.sub = this.actRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
    });

    /*
     * If valid then get all the information for that object.
     * If undefined, then re-route to home page.
     */
    if (this.id === this.undefinedId) {

      // If undefined, then re-route because it is an error.
      // TODO: Create an error page/component.
      this.router.navigate(['']);
    } else {

      const coffeeObservable = this.coffeeService.getCoffee(this.id).valueChanges();
      coffeeObservable.subscribe(coffee => {

        // Bind the form values to the Coffee from the DB.
        this.coffeeName = coffee.name;
        this.coffeeRoaster = coffee.roaster;
        this.coffeeRoastDate = moment(coffee.roastDate).format('MM/DD/YYYY');
        this.coffeeRegions = coffee.regions;
        this.coffeeFlavors = coffee.flavors;
        this.coffeeRating = coffee.rating;
        this.coffeeNotes = coffee.notes;
      });
    }
  }

  getWeather() {
    this.weatherService.getWeather(this.coffeeRegions[0])
    .subscribe(weather => {
      this.weather = weather;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
