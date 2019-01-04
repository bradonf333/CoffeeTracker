import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoffeeService } from '../Services/coffee.service';
import { MatDialog } from '@angular/material';
import { Mode, CoffeeConfirmation } from '../Models/CoffeeConfirmation';
import * as moment from 'moment';
import { WeatherService } from '../Services/weather.service';
import { Weather } from '../Models/Weather';

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
  weatherObj: any;
  weather: Weather;

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

  getWeather(region: string) {
    this.weatherService.getWeather(region)
    .subscribe(weather => {
      console.log(weather);
      this.weatherObj = weather;
      this.setWeather();
    });
  }

  setWeather() {
    this.weather = {
      humidity: this.weatherObj.main.humidity,
      temperature: this.weatherObj.main.temp,
      temp_max: this.weatherObj.main.temp_max,
      temp_min: this.weatherObj.main.temp_min,
      city: this.weatherObj.name,
      country: this.weatherObj.sys.country,
      id: this.weatherObj.weather[0].id,
      description: this.weatherObj.weather[0].description,
      mainWeatherDesc: this.weatherObj.weather[0].main
    };
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
