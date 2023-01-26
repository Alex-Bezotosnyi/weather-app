import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { convertDate, selectBg } from './helpers/helpers'
import { DailyForecastType } from '../types/types'

const DailyForecast: React.FC<DailyForecastType> = ({ fetchedDailyData }) => {
  const [res, setRes] = useState([])

  useEffect(() => {
    dispatchData()
  }, [fetchedDailyData])

  const dispatchData = (): void => {
    fetchedDailyData.length === 0
      ? setRes([])
      : setRes(fetchedDailyData.filter((item: any) => item.dt_txt.includes('18:00:00')))
  }

  return (
        <div className="w-full">
            <div className="grid gap-8 lg:grid lg:grid-cols-1">
                <div className="grid gap-2 text-gray-900 rounded-xl bg-cover bg-opacity-75">
                    <div className="flex flex-row justify-center">
                        <div
                            className="grid grid-cols-3 lg:grid-cols-5 items-start items-center justify-center gap-4 p-4 sm:grid-cols-5">
                            {res.map((item: any) => (
                                <div
                                    className="flex flex-col justify-center items-center shadow-sm shadow-gray-400 rounded-xl text-gray-900 p-8">
                                    <p className="text-center">{convertDate(item.dt)}</p>
                                    <div className="relative py-4">
                                        <Image src={selectBg(item.weather[0].main)} alt="Weather"
                                               className="object-contain top-0 right-0"
                                               width={50}
                                               height={50}
                                        />
                                    </div>
                                    <h3>
                                        {Math.round(item.main.temp)}<span>°</span>
                                    </h3>
                                    <p>
                                        {item.weather[0].main}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}
export default DailyForecast
