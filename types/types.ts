export interface PropsType {
  data: {
    main: {
      temp: number
    }
    name: string
    sys: {
      country: string
    }
    weather: [{
      [main: string]: any
      icon: string
    }]
  }
}
