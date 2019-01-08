import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { weatherApiKeys } from '../app.config';
import { CurrentWeather, CurrentWeatherData } from '../Models/WeatherModels';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  baseWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
  baseGroupWeatherUrl = 'https://api.openweathermap.org/data/2.5/group?id=';
  apiKey = weatherApiKeys.coffeeTrackerKey;
  units = 'imperial';

  constructor(private http: HttpClient) {}

  getCurrentWeather(city: string): Observable<CurrentWeather> {
    return this.http
      .get<CurrentWeatherData>(
        `${this.baseWeatherUrl}${city}&units=${this.units}&appid=${this.apiKey}`
      )
      .pipe(map(data => this.transformCurrentWeather(data)));
  }

  getWeatherAsHTML(city: string) {
    const response = this.http.get(
      `${this.baseWeatherUrl}${city}&mode=html&units=${this.units}&appid=${this.apiKey}`,
      { responseType: 'text' }
    );
    return response;
  }

  private transformCurrentWeather(data: CurrentWeatherData): CurrentWeather {
    return {
      humidity: data.main.humidity,
      temperature: data.main.temp,
      tempMax: data.main.temp_max,
      tempMin: data.main.temp_min,
      city: data.name,
      country: data.sys.country,
      description: data.weather[0].description,
      mainDesc: data.weather[0].main,
      image: this.setWeatherIcon(data.weather[0].description),
      date: data.dt * 1000
    };
  }

  private setWeatherIcon(weatherDesc: string): string {
    if (weatherDesc.indexOf('rain') >= 0) {
      return '../assets/img/weather/climacons/Cloud-Rain.svg';
    } else if (weatherDesc.indexOf('cloud') >= 0) {
      return '../assets/img/weather/climacons/Cloud.svg';
    } else if (weatherDesc.indexOf('clear') >= 0) {
      return '../assets/img/weather/climacons/Sun.svg';
    } else if (weatherDesc.indexOf('cloud') >= 0) {
      return '../assets/img/weather/climacons/Cloud.svg';
    } else if (weatherDesc.indexOf('cloud') >= 0) {
      return '../assets/img/weather/climacons/Cloud.svg';
    }
  }
}
