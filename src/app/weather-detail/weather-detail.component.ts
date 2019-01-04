import { Component, OnInit, Input } from '@angular/core';
import { Weather } from '../Models/Weather';
import * as moment from 'moment';

@Component({
  selector: 'app-weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.scss']
})
export class WeatherDetailComponent implements OnInit {

  @Input()
  weatherData: Weather;

  currentDate = moment.now();

  constructor() { }

  ngOnInit() {
    console.log(this.weatherData);
  }

}
