import React, { ChangeEvent, useState } from 'react'
import Forecast from '../components/Forecast'
import { BsSearch } from 'react-icons/bs'

const Weather = (): JSX.Element => {
  const [city, setCity] = useState<string>('')
  const [weather, setWeather] = useState<any>({})
  const [loading, setLoading] = useState<boolean>(false)

  const KEY: string = process.env.NEXT_PUBLIC_WEATHER_API_KEY
  const URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&exclude=daily&units=metric&APPID=${KEY}`

  const onInput = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault()
    setCity(event.target.value)
  }

  const onFetch = async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
    event.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(URL)
      const data = await res.json()
      setWeather(data)
    } catch (err) {
      console.log('Error')
    }
    setLoading(false)
    setCity('')
  }

  console.log(typeof weather.main)

  if (loading) {
    return null
  } else {
    return (
            <div className="w-[full] h-screen flex flex-col justify-around items-center py-12">
                {weather.main && <Forecast data={weather} />}
                <form className="flex">
                    <input className="p-2 m-2 rounded-md opacity-30 border-2 border-gray-500 text-black"
                           type="text"
                           value={city}
                           onChange={onInput}
                    />
                    <button className=""
                            type="submit"
                            onClick={onFetch}
                    >
                        <BsSearch/>
                    </button>
                </form>
            </div>
    )
  }
}

export default Weather
