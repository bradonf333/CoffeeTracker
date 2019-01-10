import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CurrentWeather } from '../Models/WeatherModels';

@Component({
  selector: 'app-weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.scss']
})
export class WeatherDetailComponent implements OnInit {
  @Input()
  weatherData: CurrentWeather;

  currentDate = moment.now();

  constructor() {}

  ngOnInit() {
    console.log(this.weatherData);
  }
}
