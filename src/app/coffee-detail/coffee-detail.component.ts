import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Coffee } from '../Models/Coffee';
import { CoffeeConfirmation, Mode } from '../Models/CoffeeConfirmation';
import { CurrentWeather, CurrentWeatherData } from '../Models/WeatherModels';
import { CoffeeService } from '../Services/coffee.service';
import { WeatherService } from '../Services/weather.service';

@Component({
  selector: 'app-coffee-detail',
  templateUrl: './coffee-detail.component.html',
  styleUrls: ['./coffee-detail.component.scss']
})
export class CoffeeDetailComponent implements OnInit, OnDestroy {
  mode: Mode;
  undefinedId = 'undefined';

  coffee: Coffee;

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

  // Column Info
  totalCols: number;
  blankColSmall: number;
  blankColLarge: number;
  labelColSmall: number;
  labelColLarge: number;
  dataColSpanSmall: number;
  dataColSpanMedium: number;
  dataColSpanLarge: number;

  // Coffee Grid Object
  coffeeGrid: any = {};

  // Weather Object
  weatherData: CurrentWeatherData;
  weather: CurrentWeather;

  // Coffee and Edit Object used to edit or delete the coffee.
  coffeeConfirmation: CoffeeConfirmation;

  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private coffeeService: CoffeeService,
    private weatherService: WeatherService,
    public dialog: MatDialog,
    private breakpointObserver: BreakpointObserver
  ) {
    this.actRoute.params.subscribe();
    breakpointObserver.observe(Breakpoints.Handset).subscribe(result => {
      if (result.matches) {
        this.setCoffeeGrid('small');
      } else {
        this.setCoffeeGrid('large');
      }
    });
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

  getCurrentWeather(region: string) {
    this.weatherService.getCurrentWeather(region).subscribe(weather => {
      console.log(weather);
      this.weather = weather;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  setCoffeeGrid(size: string) {
    if (size === 'small') {
      this.coffeeGrid.columns = 2;
      this.coffeeGrid.rowHeight = '40px';
      this.coffeeGrid.coffeeName = {
        blank: { colSpan: 0, rowSpan: 1 },
        label: { colSpan: 1, rowSpan: 1 },
        data: { colSpan: 1, rowSpan: 1 },
        blank2: { colSpan: 0, rowSpan: 1 }
      };
      this.coffeeGrid.coffeeRoaster = {
        blank: { colSpan: 0, rowSpan: 1 },
        label: { colSpan: 1, rowSpan: 1 },
        data: { colSpan: 1, rowSpan: 1 },
        blank2: { colSpan: 0, rowSpan: 1 }
      };
      this.coffeeGrid.coffeeRoastDate = {
        blank: { colSpan: 0, rowSpan: 1 },
        label: { colSpan: 1, rowSpan: 1 },
        data: { colSpan: 1, rowSpan: 1 },
        blank2: { colSpan: 0, rowSpan: 1 }
      };
      this.coffeeGrid.coffeeRegions = {
        blank: { colSpan: 0, rowSpan: 1 },
        label: { colSpan: 2, rowSpan: 1 },
        data: { colSpan: 2, rowSpan: 2 },
        blank2: { colSpan: 0, rowSpan: 1 }
      };
      this.coffeeGrid.coffeeFlavors = {
        blank: { colSpan: 0, rowSpan: 1 },
        label: { colSpan: 2, rowSpan: 1 },
        data: { colSpan: 2, rowSpan: 2 },
        blank2: { colSpan: 0, rowSpan: 1 }
      };
      this.coffeeGrid.coffeeRating = {
        blank: { colSpan: 0, rowSpan: 1 },
        label: { colSpan: 1, rowSpan: 1 },
        data: { colSpan: 1, rowSpan: 1 },
        blank2: { colSpan: 0, rowSpan: 1 }
      };
      this.coffeeGrid.coffeeFlavors = {
        blank: { colSpan: 0, rowSpan: 1 },
        label: { colSpan: 2, rowSpan: 1 },
        data: { colSpan: 2, rowSpan: 3 },
        blank2: { colSpan: 0, rowSpan: 1 }
      };
      this.coffeeGrid.coffeeNotes = {
        blank: { colSpan: 0, rowSpan: 1 },
        label: { colSpan: 2, rowSpan: 1 },
        data: { colSpan: 2, rowSpan: 2 },
        blank2: { colSpan: 0, rowSpan: 1 }
      };
    } else if (size === 'large') {
      this.coffeeGrid.columns = 7;
      this.coffeeGrid.rowHeight = '40px';
      this.coffeeGrid.coffeeName = {
        blank: { colSpan: 2, rowSpan: 1 },
        label: { colSpan: 1, rowSpan: 1 },
        data: { colSpan: 3, rowSpan: 1 },
        blank2: { colSpan: 1, rowSpan: 1 }
      };
      this.coffeeGrid.coffeeRoaster = {
        blank: { colSpan: 2, rowSpan: 1 },
        label: { colSpan: 1, rowSpan: 1 },
        data: { colSpan: 3, rowSpan: 1 },
        blank2: { colSpan: 1, rowSpan: 1 }
      };
      this.coffeeGrid.coffeeRoastDate = {
        blank: { colSpan: 2, rowSpan: 1 },
        label: { colSpan: 1, rowSpan: 1 },
        data: { colSpan: 2, rowSpan: 1 },
        blank2: { colSpan: 2, rowSpan: 1 }
      };
      this.coffeeGrid.coffeeRegions = {
        blank: { colSpan: 2, rowSpan: 1 },
        label: { colSpan: 1, rowSpan: 1 },
        data: { colSpan: 4, rowSpan: 1 },
        blank2: { colSpan: 0, rowSpan: 1 }
      };
      this.coffeeGrid.coffeeFlavors = {
        blank: { colSpan: 2, rowSpan: 1 },
        label: { colSpan: 1, rowSpan: 1 },
        data: { colSpan: 4, rowSpan: 1 },
        blank2: { colSpan: 0, rowSpan: 1 }
      };
      this.coffeeGrid.coffeeRating = {
        blank: { colSpan: 2, rowSpan: 1 },
        label: { colSpan: 1, rowSpan: 1 },
        data: { colSpan: 2, rowSpan: 1 },
        blank2: { colSpan: 2, rowSpan: 1 }
      };
      this.coffeeGrid.coffeeNotes = {
        blank: { colSpan: 2, rowSpan: 1 },
        label: { colSpan: 1, rowSpan: 1 },
        data: { colSpan: 4, rowSpan: 1 },
        blank2: { colSpan: 0, rowSpan: 1 }
      };
    }
  }
}
