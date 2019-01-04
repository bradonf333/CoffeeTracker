export interface Weather {
  humidity: string;
  temperature: string;
  temp_max: string;
  temp_min: string;
  city: string;
  country?: string;
  id: number;
  description: string;
  mainWeatherDesc: string;
}
