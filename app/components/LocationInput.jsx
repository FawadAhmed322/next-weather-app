"use client"

export default function LocationInput(props) {
  const getForecastWeatherData = props.getForecastWeatherData

  const handleSubmit = (e) => {
    e.preventDefault();
    getForecastWeatherData(e.target[0].value)
  }

  return (
    <form onSubmit={handleSubmit} className="flex h-16">
        <input type="text" className="w-[90%] py-2 px-4 rounded shadow-lg border-4 border-gray-300" />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-sm py-2 px-2 rounded">
            Get Weather Forecast
        </button>
    </form>
  )
}
