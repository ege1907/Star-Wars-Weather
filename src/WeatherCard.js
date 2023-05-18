import React from "react"

export default function WeatherCard(props) {

    const main = props.main
    console.log(main)
    let background = `url(./images/${main}background.jpg)`
    
    const tempUnit = props.isCelsius ? '°C' : '°F'
    const speedUnit = props.isCelsius ? 'KPH' : 'MPH'

    const myStyle = {
        backgroundImage: background,

    }
    
    return (
        <div className="weather-container" style={myStyle} >
            <div className="weather-display-container">
                <h1>{props.cityName.toUpperCase()}</h1>
                <img src={"./images/"+main+".png"}></img>
                    <h1>{Math.floor(props.temperature) + tempUnit}</h1>
                <p>{props.description} </p>
                <div className="data-container">
                    <h3>Feels Like:<span className="data"> {Math.floor(props.feelsLike)+tempUnit} </span></h3>
                    <h3>Wind: <span className="data">{Math.floor(props.wind) + ' ' + speedUnit} </span></h3>
                    <h3>Humidity: <span className="data">%{Math.floor(props.humidity)} </span></h3>
                    <h3>Visibility: <span className="data">{Math.floor(props.visibility)} </span></h3>
                    <h3>Pressure: <span className="data">{Math.floor(props.pressure)} hPa</span></h3>
                </div>
                
                
            </div>
        </div>
    )
}