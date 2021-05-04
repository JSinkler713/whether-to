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
  flex-grow: 1;
`
const CurrentWeatherBlock = styled.div`
  display: flex;
  flex-grow:1;
  flex-direction: column;
  height: 100%;

`

const NameTimeBlock = styled.div`
  display: flex;
  justify-content: flex;
`
const NameTimeWrapper = styled.div`
  padding: 11px 16px;
  margin-left: -10px;
  color: black;
  width: 230px;
  background: #FFFFFF;
  border-radius: 0px 4px 74px 0px;
  display: grid;
  grid-template-columns: 1fr;
`
const CityName = styled.p`
  word-break: break-word;
  text-align: left;
  font-family: Source Sans Pro, sans-serif;
  font-style: normal;
  font-weight: 600;
  margin-left: -1px; //fussing
  font-size: 24px;
  line-height: 90.5%;
  /* identical to box height, or 22px */
  color: #3A3A3A;
`
const Time = styled.p`
  text-align: left;
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height */
  color: #636363;
  opacity: 0.9;
`


const IconWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  flex-grow:1;
  padding-top: 10px;
  display: flex;
  align-items:center;
  justify-content:center;
`
const IconImage = styled.img`
  /* Works for all mobile examples on chrome responsive tab */
  min-width: 45%;
  /* the iphone 5/SE super short */
  @media screen and (max-height: 580px) {
    /* the other min-width was making vertical scroll */
    min-width: 30%;
  }
  @media screen and (max-width: 400px) {
  min-width: none;
  max-width: 300px;
  width: 30%;
  }
`

const TempMainBlock = styled.div`
  display: flex;
  margin: 5px 26px;
`
const Temp = styled.p`
  font-family: Source Sans Pro, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 64px;
  line-height: 80px;
  text-align: center;
  color: #FFFFFF;
`
const Degree = styled.sup`
 font-size: 36px;

`
const MainWeather = styled.p`
  align-self: flex-end;
  margin-bottom: 10px;
  font-family: Source Sans Pro, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 30px;
  letter-spacing: 0.03em;
  color: #FFFFFF;
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
  margin-left: 1rem;
  text-align: left;
  color: #000;
`
 
const CurrentWeather = ({weather, place})=> { 
    let icon
    if (weather.current) {
        icon = weather.current.weather[0].icon
    }
    console.log()
    return ( 
        <CurrentWeatherWrapper icon={weather.current.weather[0].icon}>
        { weather.current ? (
        <CurrentWeatherBlock>

          <NameTimeBlock>
            <NameTimeWrapper>
            <CityName>{place.split(',')[0]}</CityName>
            <Time>{calculateTime(weather.current.dt, weather.timezone_offset)}</Time>
            </NameTimeWrapper>
          </NameTimeBlock>

          <IconWrapper>
            <IconImage src={calculateIcon(icon)} />
          </IconWrapper>

          <TempMainBlock>
            <Temp>{Math.floor(weather.current.temp)}<Degree>&#8457;</Degree></Temp>
            <MainWeather>{weather.current.weather[0].main}</MainWeather>
          </TempMainBlock>

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
        </CurrentWeatherBlock>)
        :
        <>
        ''
        </>
        }
        </CurrentWeatherWrapper>
    )
} 
export default CurrentWeather;
