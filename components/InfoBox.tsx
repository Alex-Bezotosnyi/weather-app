import React from 'react'
import Image from 'next/image'
import { convertTime } from './helpers/helpers'

const InfoBox: React.FC<any> = ({ fetchedData }) => {
  return (
        <div className="w-full grid grid-cols-2 justify-center items-center gap-8 lg:w-[80%]">
            <div className="bg-gray-700 rounded-xl p-4 flex items-center justify-center gap-2">
                <div>
                    <Image src="https://cdn-icons-png.flaticon.com/512/3104/3104637.png"
                           alt="Temperature"
                           width={40}
                           height={40}
                    />
                </div>
                <div className="flex flex-col gap-0.5">
                    <h5>
                        {fetchedData.wind_speed}
                        <span> m/s</span>
                    </h5>
                </div>
            </div>
            <div className="bg-gray-700 rounded-xl p-4 flex items-center justify-center gap-2">
                <div>
                    <Image src="https://cdn-icons-png.flaticon.com/512/365/365240.png"
                           alt="Temperature"
                           width={40}
                           height={40}
                    />
                </div>
                <div>
                    <h5>
                        {convertTime(fetchedData.sunrise)}
                        <span> / </span>
                        {convertTime(fetchedData.sunset)}
                    </h5>
                </div>
            </div>
        </div>
  )
}

export default InfoBox
