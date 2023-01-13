import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { PropsType } from '../types/types'

const Forecast = ({ data }: PropsType): JSX.Element => {
  const getBg = (): string => {
    const [bg, setBg] = useState<string>('')
    const getWeather = data.weather[0].main

    useEffect((): void => {
      if (getWeather === 'Clouds') {
        setBg('/assets/cloudy.png')
      } else if (getWeather === 'Clear') {
        setBg('/assets/sunny.png')
      } else if (getWeather === 'Snow') {
        setBg('/assets/snowy.png')
      } else if (getWeather === 'Rain') {
        setBg('/assets/rainy.png')
      } else {
        setBg('/assets/moon.png')
      }
    }, [data.weather[0].main])
    return bg
  }

  return (
        <div className="max-w-[1240px] mx-4 grid grid-cols gap-8">
            <div
                className="grid grid-cols-2 bg-gradient-to-br from-[#bcc06b80] via-[#0093E910] to-[#0093E970] bg-opacity-0 p-4 bg-gray-200 bg-opacity-20 rounded-lg divide-x divide-gray-300 shadow-sm shadow-gray-400">
                <div className="flex flex-col relative justify-center items-center p-2 mx-6 gap-2">
                    <Image src={getBg()} alt="Weather"
                           className="rounded-md opacity-80"
                           width={100}
                           height={100}
                    />
                    <p className="text-lg">
                        {data.weather[0].main}
                    </p>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <p>
                        {data.name}
                        <span>, {data.sys.country}</span>
                    </p>
                    <p className="text-5xl">
                        {Math.round(data.main.temp)}<span>°</span>
                    </p>
                </div>
            </div>
        </div>
  )
}

export default Forecast
