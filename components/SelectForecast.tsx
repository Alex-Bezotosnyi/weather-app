import React, { useState } from 'react'
import axios from 'axios'
import GetForecast from './GetForecast'
import { BsSearch } from 'react-icons/bs'

const SelectForecast = (): JSX.Element => {
  const [city, setCity] = useState<string>('')
  const [term, setTerm] = useState<string>('')
  const [fetchedData, setFetchedData] = useState<{}>({})
  const [options, setOptions] = useState<[]>([])

  const KEY: string = process.env.NEXT_PUBLIC_WEATHER_API_KEY as string
  const URL_CITY = `https://api.openweathermap.org/data/2.5/weather?q=${city}&exclude=daily&units=metric&APPID=${KEY}`

  const getSearchOptions = async (value: string): Promise<void> => {
    const URL_SEARCH = `https://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&lang=en&appid=${KEY}`
    await axios(URL_SEARCH)
      .then((res) => {
        setOptions(res.data)
        setCity(value)
      })
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault()
    setCity(event.target.value)
    setTerm(event.target.value)
    if (event.target.value === '') return
    void getSearchOptions(event.target.value)
  }

  const onSelectCity = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault()

    axios(URL_CITY).then(res => {
      const dispatchedData = {
        lat: res.data.coord.lat,
        lon: res.data.coord.lon,
        name: res.data.name,
        temp: res.data.main.temp,
        feels_like: res.data.main.feels_like,
        humidity: res.data.main.humidity,
        pressure: res.data.main.pressure,
        country: res.data.sys.country,
        sunrise: res.data.sys.sunrise,
        sunset: res.data.sys.sunset,
        visibility: res.data.visibility,
        weather: res.data.weather[0].main,
        wind_speed: res.data.wind.speed
      }
      setFetchedData(dispatchedData)
    }).catch(Error)

    setCity('')
    setTerm('')
    setOptions([])
  }

  return (
        <div className="max-w-full h-screen">
            <div className="grid items-center justify-center pt-8">
                <form className="flex">
                    <input className="p-2 mr-2 rounded-md opacity-80 border-2 border-gray-600 text-black z-10"
                           type="text"
                           placeholder="Select the city"
                           value={term}
                           onChange={onChange}
                    />
                    <ul className="absolute mt-10 ml-1 p-2 bg-white text-gray-800 rounded-b-md">
                        {options.map((option: { name: string, country: string }, index) => (
                            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
                            <li key={option.name + '-' + index}>
                                <button
                                    className="text-left text-sm w-full hover:bg-zinc-700 hover:text-white px-2 py-1 cursor-pointer"
                                    type="submit"
                                    onClick={onSelectCity}>
                                    {option.name}, {option.country}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button
                        className="border-zinc-100 hover:border-zinc-500 hover:text-zinc-500 text-zinc-100 px-2 py-1 cursor-pointer"
                        onClick={onSelectCity}
                    >
                        <div className="relative right-12 bottom-3 border-l-2 z-20">
                            <BsSearch className="absolute w-6 h-6 text-gray-600"/>
                        </div>
                    </button>
                </form>
            </div>
             <GetForecast fetchedSelectedData={fetchedData}/>
        </div>
  )
}

export default SelectForecast
