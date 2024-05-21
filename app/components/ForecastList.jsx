import React from 'react'
import WeatherCard from './WeatherCard';

export default function ForecastList(props) {
  const data = props.data
  const setCurrentData = props.setCurrentData

  // Check if data exists and is not empty/null
  if (!data || !data.forecast || data.forecast.forecastday.length === 0) {
    return null; // Render nothing if data is missing or empty
  }

  return (
    <div className="flex w-full h-full overflow-y-auto justify-center">
      <ul className="w-full flex flex-col items-center">
        {data.forecast.forecastday.map((day, index) => (
          <li key={index} className="w-full flex justify-center">
            {/* <div className="mt-4 p-2 w-4/5 rounded-lg bg-slate-600">
              <p>{day.date}</p>
              <p>{day.day.condition.text}</p>
              <p>{day.day.maxtemp_c}</p>
              <p>{day.day.mintemp_c}</p>
              <p>{day.day.avgtemp_c}</p>
              <p>{day.day.maxwind_kph}</p>
              <p>{day.day.totalprecip_mm}</p>
            </div> */}
            <WeatherCard data={day} setCurrentData={setCurrentData} />
          </li>
        ))}
      </ul>
    </div>
  )
}
