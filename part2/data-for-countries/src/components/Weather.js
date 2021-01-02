import React, { useState, useEffect } from 'react'
import axios from 'axios'






const Weather = ({ capital }) => {

    const [weatherdata, setweatherdata] = useState(undefined)

    useEffect(() => {
        console.log(process.env.REACT_APP_API_KEY)
        axios
            .get('http://api.weatherstack.com/current', {
                params: {
                    access_key: process.env.REACT_APP_API_KEY,
                    query: capital

                }
            })
            .then((response) => {
                console.log("weather data: ", response)
                setweatherdata(response.data.current)
                console.log("data: ", weatherdata)

            })
    }, [process.env.REACT_APP_API_KEY])

    if (!weatherdata) {
        return (<></>)
    }
    console.log("data out: ", weatherdata)
    return (
        <>
            <div>
                <h3>Weather in {capital}</h3>

            </div>
            <div>
                <p> <b>temperature: </b>{weatherdata.temperature} Celcius </p>
            </div>
            <div>
                <img width='80px' src={weatherdata.weather_icons}></img>
            </div>
            <div>
                <p> <b>Wind:</b> {weatherdata.wind_speed} mph direction {weatherdata.wind_dir} </p>
            </div>
        </>
    )
}

export default Weather