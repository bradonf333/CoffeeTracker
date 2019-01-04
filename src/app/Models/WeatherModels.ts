export interface CurrentWeather {
  humidity: number;
  temperature: number;
  tempMax: number;
  tempMin: number;
  city: string;
  country: string;
  description: string;
  mainDesc: string;
  image: string;
  date: number;
}

export interface CurrentWeatherData {
  weather: [
    {
      description: string;
      icon: string;
      main: string;
    }
  ];
  main: {
    humidity: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  sys: {
    country: string;
  };
  dt: number;
  name: string;
}
