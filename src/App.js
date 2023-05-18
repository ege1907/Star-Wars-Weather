import React from "react"
import WeatherCard from "./WeatherCard"
import Homescreen from "./Homescreen"

export default function App() {

  const [weatherQuery, setWeatherQuery] = React.useState({
    current: {},
    forecast: {},
  })
  const [userInput, setUserInput] = React.useState({
    cityName: "",
    isCelsius: true,
    isCurrent: true,
  })

  const units = userInput.isCelsius ? 'metric' : 'imperial'
  const tempUnit = userInput.isCelsius ? '°C' : '°F'

  function toggleUnits() {
    const unitsNew = userInput.isCelsius
    setUserInput(prevState => {
      return{...prevState, isCelsius: !unitsNew}
    })
  }

  function toggleIsCurrent() {
    const currentDisplay = userInput.isCurrent
    setUserInput(prevState => {
      return{...prevState, isCurrent: !currentDisplay}
    })
  }

  React.useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${userInput.cityName}&units=${units}&appid=287e38af65aa76e627c9552d45c48593`
    ).then(response => response.json()).then(data => setWeatherQuery(prevState => {
      return {...prevState, current: data}
    }))
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${userInput.cityName}&units=${units}&appid=287e38af65aa76e627c9552d45c48593`).then(response => response.json()).then(data => setWeatherQuery(prevState => {
        return{...prevState, forecast: data}
      }))
  },[userInput.isCelsius, units, userInput.cityName])
  
  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleChange(e) {
    const value = e.target.value
    setUserInput(prevState => {
      return{...prevState, cityName: value}
    })
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' ) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${userInput.cityName}&units=${units}&appid=287e38af65aa76e627c9552d45c48593`
      ).then(response => response.json()).then(data => setWeatherQuery(prevState => {
        return {...prevState, current: data}
      }))
      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${userInput.cityName}&units=${units}&appid=287e38af65aa76e627c9552d45c48593`).then(response => response.json()).then(data => setWeatherQuery(prevState => {
        return{...prevState, forecast: data}
      }))
    }
  }

  

  const forecastItems = weatherQuery.forecast.list ? weatherQuery.forecast.list.map(item => {
    const description = item.weather[0].main
    const date = item.dt_txt
    const time = date.split(" ")[1]
    const hour = time.split(":")[0]
    return (
      <div className="forecast-card">
        <p>{hour}</p>
        <img alt="bruh" src={"./images/"+description+".png"}></img>
        <h2>{Math.floor(item.main.temp)+tempUnit}</h2>
        <h2>{item.weather[0].description}</h2>
      </div>
    )
  }) : null

  console.log(weatherQuery)
  console.log(forecastItems)
  return (
    <div className="main-container">
      <div className="temperature-input">
        <i onClick={toggleUnits} class="fa-solid fa-temperature-high fa-2xl"></i>
        <h2>{userInput.isCelsius ? 'Celsius' : 'Fahrenheit'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="cityInput"
            value={userInput.cityName}
            type="text"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter City Name"
          />
        </form>
        <i onClick={toggleIsCurrent} class="fa-solid fa-cloud fa-2xl"></i>
        <h2>{userInput.isCurrent ? "Current" : "Forecast"}</h2>
      </div>
      {weatherQuery.current.main && userInput.isCurrent ? <WeatherCard
        cityName={weatherQuery.current.name}
        isCelsius={userInput.isCelsius}
        weatherImg=""
        temperature={weatherQuery.current.main.temp}
        feelsLike={weatherQuery.current.main.feels_like}
        description={weatherQuery.current.weather[0].description}
        wind={weatherQuery.current.wind.speed}
        humidity={weatherQuery.current.main.humidity}
        pressure={weatherQuery.current.main.pressure}
        visibility={weatherQuery.current.visibility}
        main={weatherQuery.current.weather[0].main}
      /> : <Homescreen />}

      {!userInput.isCurrent ?
        <div>
          <h1 className="forecast-name">{weatherQuery.current.name}</h1>
          <div className="forecast-container">
            {forecastItems}
          </div>
        </div>
         : null}
      
    </div>
    
)
}

