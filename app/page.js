"use client"

import { useState, useEffect } from "react"
import Image from 'next/image'

// Components
import LocationInput from "./components/LocationInput"
import ForecastList from "./components/ForecastList"

const baseURL = "https://api.weatherapi.com/v1"
const apiKey = process.env.NEXT_PUBLIC_API_KEY
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export default function Home() {
  const [data, setData] = useState({})
  const [currentData, setCurrentData] = useState({})
  // const [location, setLocation] = useState();
  const [currentLocation, setCurrentLocation] = useState({})
  const [minTemp, setMinTemp] = useState('')
  const [maxTemp, setMaxTemp] = useState('')
  const [wind, setWind] = useState('')
  const [humidity, setHumidity] = useState('')
  const [rainChance, setRainChance] = useState('')
  const [snowChance, setSnowChance] = useState('')
  const [totalRain, setTotalRain] = useState('')
  const [totalSnow, setTotalSnow] = useState('')
  const [city, setCity] = useState('')
  const [region, setRegion] = useState('')
  const [date, setDate] = useState('')

  const getForecastWeatherData = async (location) => {
    const url = `${baseURL}/forecast.json?key=${apiKey}&q=${location}&aqi=yes&days=14` 
    const res = await fetch(url)
    const data = await res.json()
    console.log('---------------- Forecast ----------------')
    setData(data)
    setCurrentData(data.forecast.forecastday[0])
    setCurrentLocation(data.location)
    console.log(data)
  }

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async ({ coords }) => {
        const { latitude, longitude } = coords
        await getForecastWeatherData(`${latitude},${longitude}`);
      });
    }
  }, []);

  useEffect(() => {
    console.log('-------Current Data--------')
    console.log(currentData)
    if (Object.keys(currentData).length > 0) {
      setMinTemp(currentData.day.mintemp_c)
      setMaxTemp(currentData.day.maxtemp_c)
      setDate(currentData.date)
      setWind(currentData.day.maxwind_kph)
      setHumidity(currentData.day.avghumidity)
      setRainChance(currentData.day.daily_chance_of_rain)
      setSnowChance(currentData.day.daily_chance_of_snow)
      setTotalRain(currentData.day.totalprecip_mm)
      setTotalSnow(currentData.day.totalsnow_cm)
    }
  }, [currentData])

  useEffect(() => {
    if (Object.keys(currentLocation).length > 0) {
      setCity(currentLocation.name)
      setRegion(currentLocation.region)
    }
  }, [currentLocation])

  if (!currentData || !currentLocation) {
    return null;  // or return a loading spinner
  }

  return (
    <main className={`flex h-screen max-h-screen text-sm`}>
      <div className={`flex flex-col w-[30%] bg-blue-600`}>
        <LocationInput getForecastWeatherData={getForecastWeatherData} />
        <ForecastList data={data} setCurrentData={setCurrentData} />
      </div>
      <div 
        className={`flex w-[70%] bg-red-600 text-white justify-center items-center`} 
        style={{ 
          backgroundImage: (
            currentData?.day?.condition?.code ?
            `url("/weather_backgrounds/night/${currentData.day.condition.code}.jpeg")` : 
            "none"
          ),
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }
      }>
        <div className={`flex`}>
          <div className={`flex flex-col m-2 p-2 justify-center items-center bg-slate-600 rounded-lg opacity-60`}>
          {
            currentData?.day?.condition?.icon && (
              <Image
                src={`http:${currentData.day.condition.icon}`}
                alt={currentData.day.condition.text || 'Weather condition'}
                width={64}
                height={64}
              />
            )
          }
          {
            currentData?.day?.condition?.text && (
              <p>{currentData.day.condition.text}</p>
            )
          }
          </div>
          <div className={`flex flex-col m-2 p-2 justify-center items-center bg-slate-600 rounded-lg opacity-60`}>
            <p>Min Temp: {minTemp}c</p>
            <p>Max Temp: {maxTemp}c</p>
          </div>
          <div className={`flex flex-col m-2 p-2 justify-center items-center bg-slate-600 rounded-lg opacity-60`}>
            <p>Rain Chance: {rainChance}%</p>
            <p>Snow Chance: {snowChance}%</p>
          </div>
          <div className={`flex flex-col m-2 p-2 justify-center items-center bg-slate-600 rounded-lg opacity-60`}>
            <p>Total Rain: {totalRain}mm</p>
            <p>Total Snow: {totalSnow}cm</p>
          </div>
          <div className={`flex flex-col m-2 p-2 justify-center items-center bg-slate-600 rounded-lg opacity-60`}>
            <p>Wind: {wind}kph</p>
            <p>Humidity: {humidity}%</p>
          </div>
          <div className={`flex flex-col m-2 p-2 justify-center items-center bg-slate-600 rounded-lg opacity-60`}>
            <p>City: {city}</p>
            <p>Region: {region}</p>
          </div>
          <div className={`flex flex-col m-2 p-2 justify-center items-center bg-slate-600 rounded-lg opacity-60`}>
            <p>{dayNames[new Date(date).getDay()]}</p>
            <p>{date}</p>
          </div>
        </div>
      </div>
    </main>
  );
  
}
