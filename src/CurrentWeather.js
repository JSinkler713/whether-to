import React, {useState, useEffect} from 'react'; 
import styled from 'styled-components'
import calculateIcon from './utils/calculateIcon'
import calculateTime from './utils/calculateTime'
import {useSpring, animated, config} from 'react-spring'

const CurrentWeatherWrapper = styled.div`
  /*height: 100%;*/
  /*height: 50%;*/
  height: 50%;
  padding: 0px 10px;
  width: 100%;
  max-width: 800px;
  icon: icon;
  flex-grow: 1;
`
const CurrentWeatherBlock = styled.div`
  display: flex;
  flex-grow:1;
  flex-direction: column;
  height: 100%;
  @media (min-width: 700px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows:  75px auto;
    grid-template-areas: 
    "title title"
    "icon degree"
    "icon infoblock"
  }
`

const NameTimeBlock = styled.div`
  display: flex;
  @media (min-width: 700px) {
    grid-area: title;
    justify-content: center;
  }

`
const NameTimeWrapper = styled.div`
  padding: 11px 16px;
  margin-left: -10px;
  color: black;
  width: 260px;
  background: #FFFFFF;
  border-radius: 0px 4px 74px 0px;
  display: grid;
  grid-template-columns: 1fr;
  @media (min-width: 700px) {
    width: 400px;
    grid-area: title;
    justify-content: center;
    border-radius: 4px 4px 4px 4px;
  }
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
  @media (min-width: 700px) {
    grid-area: icon;
    justify-content: center;
  }
`
const IconImage = styled.img`
  /* Works for all mobile examples on chrome responsive tab */
  width: min(40%, 200px);
  max-width: 250px;
  /* the iphone 5/SE super short */
  @media screen and (max-width: 400px) {
  min-width: none;
  width: 30%;
  }
  /* Switch order */
  @media screen and (max-height: 600px) {
    /* the other min-width was making vertical scroll */
    width: calc( 95vh - 440px );
  }
`

const TempMainBlock = styled.div`
  display: flex;
  margin: 5px 26px;
  @media (min-width: 700px) {
    grid-area: degree;
    display: flex;
    align-items: center;
  }
`
const Temp = styled(animated.div)`
  font-family: Source Sans Pro, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 64px;
  line-height: 80px;
  text-align: center;
  color: #FFFFFF;
  @media (min-width: 700px) {
    align-items: center;
    display: flex;
  }
`
const AnimatedNum = styled(animated.span)`
`
const Degree = styled.sup`
 font-size: 36px;
 color: ${({active})=> (active ? '#FFFFFF' : 'hsla(0 0% 100% / 20%)')};
`
const Slash = styled.sup`
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
  @media (min-width: 700px) {
    align-self: center;
    margin-bottom: -28px;
    padding: 0px 10px;
  }
`

const InfoBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  @media (min-width: 700px) {
    grid-area: infoblock;
    justify-content: flex-start;
    margin: 26px;
  }
`
const InfoWrapper = styled.div`
  margin-right: -10px;
  color: black;
  width: 240px;
  border-radius: 4px 0px 0px 128px;
  background: #FFF; 
  display: grid;
  grid-template-columns: auto 80px;
  @media (min-width: 700px) {
    grid-template-columns: 3fr 2fr;
    width: 240px;
    height: 120px;
    border-radius: 4px;
  }
`
const StatNames = styled.div`
  padding: 10px;
  font-family: Source Sans Pro, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  /* identical to box height */
  text-align: right;
  color: #6A6A6A;
  @media (min-width: 700px) {
    text-align: left;

  }
`
const StatProperties = styled.div`
  padding: 10px 0px;
  font-family: Source Sans Pro, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  text-align: left;
  color: #000;
`

const AQIDescription = styled.span`
  font-size: 14px;
  font-shadow: 1px black;
  color: ${({aqiColor})=> aqiColor};
  font-weight: 800;
`
 
const CurrentWeather = ({weather, place, aqi})=> { 
  const [celsiusTemp, setCelsiusTemp] = useState()
  const [fahrenheitTemp] = useState(Math.floor(weather.current.temp))
  const [windSpeedImperial] = useState(Math.round(weather.current.wind_speed))
  const [windSpeedMetric] = useState(Math.round(weather.current.wind_speed * 1.60934))
  const [isMetric, setIsMetric] = useState(false)
  
  const spring = useSpring({ 
    config: {...config.slow, clamp: true},
    val: !isMetric ? fahrenheitTemp : celsiusTemp 
  });
  const springTwo = useSpring({
    config: config.slow,
    clamp: true,
    val: !isMetric ? windSpeedImperial : windSpeedMetric 
  });
  

  useEffect(() => {
    //effect
    // (32°F − 32) × 5/9 = 0°C
    const currentTempC = Math.round((weather.current.temp - 32) * (5/9))
    setCelsiusTemp(currentTempC)
    return () => {
      //cleanup
    };
  }, []);//eslint-disable-line react-hooks/exhaustive-deps

  const changeUnits = ()=> {
    setIsMetric(!isMetric)
  }
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
            <IconImage src={calculateIcon(weather.current.weather[0].icon)} />
          </IconWrapper>

          <TempMainBlock>
            <Temp><AnimatedNum>{spring && spring.val && spring.val.interpolate(val => Math.floor(val))}</AnimatedNum><Degree onClick={changeUnits} active={!isMetric}>&#8457;</Degree><Slash>/</Slash><Degree onClick={changeUnits} active={isMetric}>&#8451;</Degree></Temp>
            <MainWeather>{weather.current.weather[0].main}</MainWeather>
          </TempMainBlock>

          <InfoBlock>
            <InfoWrapper>
              <StatNames>
              <p>Precipitation</p>
              <p>Humidity</p>
              <p>UV Index</p>
              <p>Wind</p>
              <p>AQI</p>
              </StatNames>
              <StatProperties>
              <p>{weather.minutely ? Math.floor(weather.minutely[0].precipitation * 100) : Math.floor(weather.hourly[0].pop) * 100}%</p>
              <p>{weather.current.humidity}%</p>
              <p>{Math.floor(weather.current.uvi)} of 10</p>
              <p><AnimatedNum>{springTwo && springTwo.val && springTwo.val.interpolate(val=> Math.floor(val))}</AnimatedNum> {!isMetric ? 'mph' : 'kph'}</p>
              {aqi[1] === 'n' ?
                (<p><AQIDescription aqiColor={`rgba(0, 0, 0, 0.5)`}>No Data</AQIDescription></p>)
              :
              (
              <p>{aqi[0]} <AQIDescription aqiColor={aqi[2]}>{aqi[1]}</AQIDescription></p>
              )
              }


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
