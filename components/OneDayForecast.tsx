import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { selectBg } from './helpers/helpers'

const OneDayForecast: React.FC<any> = ({ data }): JSX.Element => {
  const getBg = (): string => {
    const [bg, setBg] = useState('')

    useEffect(() => {
      setBg(selectBg(data.weather))
    }, [data.weather])
    return bg
  }

  return (
        <div className="w-full">
            <div className="py-8 gap-8 lg:grid lg:grid-cols-1">
                <div
                    className="grid grid-rows-3 gap-2 text-gray-900 px-8 pb-8 rounded-xl bg-cover bg-[url(https://img.freepik.com/free-vector/gorgeous-clouds-background-with-blue-sky-design_1017-25501.jpg?w=996&t=st=1674415142~exp=1674415742~hmac=b6e70a359a5ba71538042cade873d33387c49372ef5ebc2d26e2617e2001cfca)]">
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row gap-4 items-center ">
                            <div className="bg-gray-100 rounded-full p-2">
                                <Image src="https://cdn-icons-png.flaticon.com/512/3222/3222801.png"
                                       alt="Weather"
                                       width={20}
                                       height={20}
                                />
                            </div>
                            <div>
                                <h2>{data.name}</h2>
                                <p>{data.country}</p>
                            </div>
                        </div>
                        <Image src={getBg()} alt="Forecast"
                               className="rounded-md object-contain"
                               width={150}
                               height={150}
                        />
                    </div>
                    <div className="flex flex-col gap-2 pb-8">
                        <div className="flex gap-4 items-center">
                            <div>
                                <h1>
                                    {Math.round(data.temp)}<span>°</span>
                                </h1>
                            </div>
                            <div className="bg-gray-100 text-gray-900 rounded-md px-1">
                                <h4>
                                    {Math.round(data.feels_like)}<span>°</span>
                                </h4>
                            </div>
                        </div>
                        <div className="w-fit bg-gray-100 rounded-md px-1">
                            <h5>
                                {data.weather}
                            </h5>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div
                            className="flex flex-col justify-center items-center bg-gray-800 rounded-xl text-gray-100 p-2 sm:py-0">
                            <p>Pressure</p>
                            <h4>
                                {data.pressure}<span>hPa</span>
                            </h4>
                        </div>
                        <div
                            className="flex flex-col justify-center items-center bg-green-500 rounded-xl text-gray-900 p-2">
                            <p>Visibility</p>
                            <h4>
                                {(data.visibility / 1000).toFixed(2)}<span>km</span>
                            </h4>
                        </div>
                        <div
                            className="flex flex-col justify-center items-center bg-gray-100 rounded-xl text-gray-900 p-2">
                            <p>Humidity</p>
                            <h4>
                                {data.humidity}<span>%</span>
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default OneDayForecast
