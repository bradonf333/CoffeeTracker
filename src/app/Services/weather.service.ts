import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { weatherApiKeys } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  baseWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
  baseGroupWeatherUrl = 'https://api.openweathermap.org/data/2.5/group?id=';
  apiKey = weatherApiKeys.coffeeTrackerKey;
  units = 'imperial';

  constructor(private http: HttpClient) { }

  getWeather(city: string) {
    return this.http.get(`${this.baseWeatherUrl}${city}&units=${this.units}&appid=${this.apiKey}`);
  }

  getWeatherAsHTML(city: string) {
    const response = this.http.get(`${this.baseWeatherUrl}${city}&mode=html&units=${this.units}&appid=${this.apiKey}`,
    {responseType: 'text'});
    return response;
  }
}
