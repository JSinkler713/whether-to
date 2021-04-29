import React, {useState, useEffect, useContext} from 'react'; 
import styled from 'styled-components'
import calculateBackground from './utils/calculateBackground'
import calculateIcon from './utils/calculateIcon'
import calculateTime from './utils/calculateTime'
// import clear from './assets/01d.svg'
// import cloud from './assets/03.svg'
// import rain from './assets/09.svg'
// import thunder from './assets/11.svg'

const CurrentWeatherWrapper = styled.div`
 height: 100%;
 width: 100%;
 icon: icon;
`
const IconWrapper = styled.div`
width: 100%;
margin: 0 auto;
`
/*
const Icon = styled.img`
width: 100px;
height: 100px;
src: cloud;
src: TODO not resolving;
`
*/
 
const CurrentWeather = ({weather, place})=> { 
    let icon
    if (weather.current) {
        icon = weather.current.weather[0].icon
    }
    console.log()
    return ( 
        <CurrentWeatherWrapper icon={weather.current.weather[0].icon}>
        { weather.current ? (
        <div>
            <p>{place.split(',')[0]}</p>
          <IconWrapper>
            <img src={calculateIcon(icon)} />
          </IconWrapper>
            <p>{weather.current.weather[0].main}</p>
            <p>{Math.floor(weather.current.temp)} F</p>
            <p>{calculateTime(weather.current.dt, weather.timezone_offset)}</p>
            <p>Precipitation {weather.minutely ? weather.minutely[0].precipitation * 100 : weather.hourly[0].pop * 100}%</p>
            <p>Humidity {weather.current.humidity}%</p>
            <p>UV Index {Math.floor(weather.current.uvi)} of 10</p>
            <p>Wind {Math.round(weather.current.wind_speed)} mph</p>
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
