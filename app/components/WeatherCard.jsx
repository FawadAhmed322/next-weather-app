import React from 'react'
import Image from 'next/image'

export default function WeatherCard(props) {
  const data = props.data
  const setCurrentData = props.setCurrentData
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  return (
    <div className="flex mt-4 p-2 w-4/5 rounded-lg bg-slate-600 justify-center items-center text-white" onClick={() => setCurrentData(data)}>
      <div className="w-1/5">
        <Image
          src={`http:${data.day.condition.icon}`}
          alt={data.day.condition.text}
          width={64}
          height={64}
         />
      </div>
      <div className="flex w-4/5 ml-4">
        <div className="flex flex-col">
          <div className='ml-2'>
            {`${data.day.mintemp_c}c`}
          </div>
          <div className='ml-2'>
            {`${data.day.maxtemp_c}c`}
          </div> 
        </div>
        <div className="flex flex-col mx-auto">
          <div className='ml-2'>
            {`${data.date}`}
          </div>
          <div className='ml-2'>
            {`${dayNames[new Date(data.date).getDay()]}`}
          </div> 
        </div>
      </div>
    </div>
  )
}
