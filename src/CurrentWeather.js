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
 padding: 10px;
 width: 100%;
 icon: icon;
`
const IconWrapper = styled.div`
width: 100%;
margin: 0 auto;
`
const InfoBlock = styled.div`
display: flex;
justify-content: flex-end;
`
const InfoWrapper = styled.div`
margin-right: -10px;
color: black;
width: 230px;
border-radius: 4px 0px 0px 128px;
background: #FFF; 
display: grid;
grid-template-columns: auto 80px;
`
const StatNames = styled.div`
padding: 10px 0px;
font-family: Source Sans Pro, sans-serif;
font-style: normal;
font-weight: normal;
font-size: 18px;
line-height: 21px;
/* identical to box height */

text-align: right;

color: #6A6A6A;
`
const StatProperties = styled.div`
padding: 10px 0px;
font-family: Source Sans Pro, sans-serif;
font-style: normal;
font-weight: 600;
font-size: 18px;
line-height: 21px;
/* identical to box height */
margin-left: 1rem;

text-align: left;

color: #000;

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
          {/*
            <p>{weather.current.weather[0].main}</p>
            <p>{Math.floor(weather.current.temp)} F</p>
            <p>{calculateTime(weather.current.dt, weather.timezone_offset)}</p>
            */}
          <InfoBlock>
          <InfoWrapper>
            <StatNames>
            <p>Precipitation</p>
            <p>Humidity</p>
            <p>UV Index</p>
            <p>Wind</p>
            </StatNames>
            <StatProperties>
            <p>{weather.minutely ? weather.minutely[0].precipitation * 100 : weather.hourly[0].pop * 100}%</p>
            <p>{weather.current.humidity}%</p>
            <p>{Math.floor(weather.current.uvi)} of 10</p>
            <p>{Math.round(weather.current.wind_speed)} mph</p>


            </StatProperties>
          </InfoWrapper>
          </InfoBlock>
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
