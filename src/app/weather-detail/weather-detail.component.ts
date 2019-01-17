import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
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

  isSmallDevice: BreakpointState;

  constructor(private breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe(Breakpoints.Handset).subscribe(result => {
      this.isSmallDevice = result;
    });
  }

  ngOnInit() {
    console.log(this.weatherData);
  }
}
