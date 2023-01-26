export interface OneDayForecastType {
  data: {
    lat: number
    lon: number
    country: string
    humidity: number
    name: string
    feels_like: number
    pressure: number
    sunrise: number
    sunset: number
    temp: number
    visibility: number
    weather: string
    wind: number
  }
}

export interface DailyForecastType {
  fetchedDailyData: []
}

export interface SelectedDataType {
  lat: number
  lon: number
  data: {
    lat: number
    lon: number
    country?: string
    humidity?: number
    name?: string
    feels_like?: number
    pressure?: number
    sunrise?: number
    sunset?: number
    temp?: number
    visibility?: number
    weather?: string
    wind?: number
  }
}
