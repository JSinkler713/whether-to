import React, {useState, useEffect, useContext} from 'react'; 
import styled from 'styled-components'
import calculateBackground from './utils/calculateBackground'

const CurrentWeatherWrapper = styled.div`
 height: 100%;
 width: 100%;
 icon: icon;
`
 
const CurrentWeather = ({weather})=> { 
    let icon
    if (weather.current) {
        icon = weather.current.weather[0].icon
    }
    console.log()
    return ( 
        <CurrentWeatherWrapper icon={weather.current.weather[0].icon}>
        { weather.current ? (
        <div>
            <p>{weather.current.weather[0].main}</p>
            <p>{Math.floor(weather.current.temp)} F</p>
        </div>)
        :
        <>
        ''
        </>
        }
        </CurrentWeatherWrapper>
    )
} 
export default CurrentWeather;