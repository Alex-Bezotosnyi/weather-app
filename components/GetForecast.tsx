import React, { useEffect, useState } from 'react'
import { Simulate } from 'react-dom/test-utils'
import { ProgressBar } from 'react-loader-spinner'
import axios from 'axios'
import error = Simulate.error
import DailyForecast from './DailyForecast'
import InfoBox from './InfoBox'
import OneDayForecast from './OneDayForecast'
import { OneDayForecastType, SelectedDataType } from '../types/types'

const GetForecast = ({ fetchedSelectedData }: any): JSX.Element => {
  const [coords, setCoords] = useState<number[]>([])
  const [dispatchedSelectedData, setDispatchedSelectedData] = useState<any>([])
  const [fetchedData, setFetchedData] = useState<any[]>([])
  const [fetchedDailyData, setFetchedDailyData] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY

  useEffect(() => {
    fetchForecast(fetchedSelectedData)
  }, [dispatchedSelectedData])

  useEffect(() => {
    // eslint-disable-next-line multiline-ternary
    setDispatchedSelectedData(fetchedSelectedData)
    setCoords([fetchedSelectedData.lat, fetchedSelectedData.lon])
  }, [fetchedSelectedData])

  const fetchForecast = (dispatchedSelectedData: SelectedDataType | React.SetStateAction<OneDayForecastType>): void => {
    setLoading(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = Math.floor(position.coords.latitude * 100) / 100
        const longitude = Math.floor(position.coords.longitude * 100) / 100

        const URL_COORDS = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${KEY}`
        axios.get(URL_COORDS).then(res => {
          setFetchedData(res.data)
          const dispatchedData = {
            lat: res.data.coord.lat,
            lon: res.data.coord.lon,
            name: res.data.name,
            temp: res.data.main.temp,
            wind_speed: res.data.wind.speed,
            feels_like: res.data.main.feels_like,
            humidity: res.data.main.humidity,
            pressure: res.data.main.pressure,
            country: res.data.sys.country,
            visibility: res.data.visibility,
            weather: res.data.weather[0].main,
            sunrise: res.data.sys.sunrise,
            sunset: res.data.sys.sunset
          }

          Object.keys(dispatchedSelectedData).length === 0
          // @ts-expect-error
          // eslint-disable-next-line multiline-ternary
            ? setFetchedData(dispatchedData) : setFetchedData(dispatchedSelectedData)
        }).catch(error)

        let URL_DAILY: string

        Object.keys(dispatchedSelectedData).length === 0
          ? URL_DAILY = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${KEY}`
          : URL_DAILY = `https://api.openweathermap.org/data/2.5/forecast?lat=${coords[0]}&lon=${coords[1]}&units=metric&appid=${KEY}`

        if ('lat' in dispatchedSelectedData) {
          setCoords([dispatchedSelectedData.lat, dispatchedSelectedData.lon])
        }

        axios.get(URL_DAILY).then((res) => {
          setFetchedDailyData(res.data.list)
        }).catch(error)

        setLoading(false)
      })
    }
  }

  return (
        <div className="w-full">
            {loading
              ? (
                    <div className="w-full min-h-full grid justify-center items-center">
                            <ProgressBar
                                width="80"
                                height="80"
                                ariaLabel="progress-bar-loading"
                                wrapperStyle={{}}
                                wrapperClass="progress-bar-wrapper"
                                borderColor="#4d99e9"
                                barColor="#fdd835"
                            />
                    </div>
                )
              : (
                    <div className="w-full min-h-full">
                        <div className="grid mx-8 justify-self-center justify-center items-center md:gap-8 lg:mx-24 md:grid-cols-4">
                            <div className="col-span-2 w-full flex flex-col justify-center items-center md:col-span-2">
                                <OneDayForecast data={fetchedData}/>
                            </div>
                            <div className="col-span-3 h-full w-full flex flex-col justify-center items-center gap-8 md:col-span-2">
                                <InfoBox fetchedData={fetchedData}/>
                                <DailyForecast fetchedDailyData={fetchedDailyData}/>
                            </div>
                        </div>
                    </div>
                )}
        </div>
  )
}

export default GetForecast
