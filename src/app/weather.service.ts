import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeather(city: string) {
    return this.http.get('api.openweathermap.org/data/2.5/weather?q=London,uk&appid=c24cf63b87b3b8020471d8f3fff122fe');
  }

}
