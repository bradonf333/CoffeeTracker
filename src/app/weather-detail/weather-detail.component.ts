import { Component, OnInit, Input } from '@angular/core';
import { CurrentWeather } from '../Models/WeatherModels';
import * as moment from 'moment';

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
