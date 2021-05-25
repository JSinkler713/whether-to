import './App.css';
import { useState, useEffect } from 'react';
import MainSearchHome from './MainSearchHome';
import SecondarySearch from './SecondarySearch';
import { geolocated } from 'react-geolocated';
import fetchOneCall from './utils/fetchOneCall.js'
import CurrentWeather from './CurrentWeather';
import ForecastDays from './ForecastDays';
import styled from 'styled-components';
import calculateBackground from './utils/calculateBackground';
import {Link, Switch, Route, useHistory} from 'react-router-dom'

const AppWrapper = styled.div`
 background: ${({icon})=> calculateBackground(icon)};
 height: 100%;
 display: flex;
 flex-direction: column;
`
const SmallHeaderSearch = styled.header`
display: flex;
align-items:center;
justify-content: space-between;
padding: 0px 10px;
height: 48px;
width: 100%;

`
const TitleWrapper = styled.div`
  text-align: center;
`
const SmallTitle = styled.h1`
  font-family: 'Staatliches', cursive;
  color: white;
  font-size: 14px;
  line-height: 90.5%;
`
const StyledLink = styled(Link)`
  text-decoration: none;
`

function App(props) {
  let history = useHistory()
  const [value, setValue] = useState('')
  const [otherHeight, setOtherHeight] = useState()
  const [place, setPlace] = useState('')
  const [error, setError] = useState(false)
  const [myCoords, setMyCoords] = useState({ lat:null, lng:null })
  const [coords, setCoords] = useState({ lat:null, lng:null })
  const [weather, setWeather] = useState(null)
  const [forecasts, setForecasts] = useState([])
  const [previousSearches, setPreviousSearches] = useState([])
  const [hideSearch, setHideSearch] = useState(true)

  useEffect(()=> {
    setOtherHeight(window.innerHeight)
  }, [])
  useEffect(()=> {
    // on component load get the previous searches out of local storage
    setPreviousSearches( JSON.parse(localStorage.getItem('searches')) )
  }, [])

    // when lat and lng update call our OneCallApi
  const getWeather = async(lat=coords.lat, lng=coords.lng)=> {
    let data = await fetchOneCall(lat, lng)
    if (data === undefined) {
      // do some error handling
      setWeather(null)
      // API comes in as both string or number :(
      //eslint-disable-next-line 
    } else if (data.cod == '400') {
      setError(true)
      setWeather(null)
    } else {
      setPlace(value)
      setError(false)
      setWeather(data)
      history.push('/weather')
    }
  }

  useEffect(()=> {
    // when a user enters a search save it to lacalstorage
    setWeather(null)
    let searches = localStorage.getItem('searches')
    let updatedsearches
    searches = JSON.parse(searches)
    if (searches && searches.length > 0) {
      searches = searches.filter((item)=> item!== value)
    } else {
      searches = []
    }
    updatedsearches = [
      ...searches,
      value
    ]
    localStorage.setItem('searches', JSON.stringify(updatedsearches))
    setPreviousSearches(updatedsearches)
  }, [coords]) //eslint-disable-line react-hooks/exhaustive-deps


  const getMyWeather = async ()=> {
      // this is to use current location from Geolocated App
      let data = await fetchOneCall(props.coords.latitude, props.coords.longitude)
      setPlace(value)
      setWeather(data)
  }

  const clearSearchHistory = ()=> {
    localStorage.setItem('searches', JSON.stringify([]))
    setPreviousSearches([])
  }

  useEffect(()=> {
    // if value changes, then so should place
    setPlace(value)
  }, [getMyWeather])//eslint-disable-line react-hooks/exhaustive-deps


  const clearWeather = ()=> {
    setWeather(null)
  }
  useEffect(()=> {
    if (props.coords) {
    // these can change to other locations
    setCoords({ lat: props.coords.latitude, lng: props.coords.longitude})

    // this is always my own
    setMyCoords({ lat:props.coords.latitude, lng: props.coords.longitude})
    }
  },[props.coords])

  useEffect(()=> {
    //if weather updates, then update forecasts
    if (weather) {
      /*
      let days =[]
      weather.daily.forEach((day, i)=> {
        //days.push(day.weather[0].icon)
        days.push(day)
      })
      */
      //check if hidden, if not toggleClose
      setForecasts(weather.daily)
    }
  }, [weather])

  useEffect(()=> {
    if (!weather) {
      history.push('/')
    }
    // only check on first mount for redirect on
    // weatherreport/weather.xyz
    // else flickers...
  }, [])//eslint-disable-line react-hooks/exhaustive-deps


  return (
      <Switch>
        <Route exact={true} path="/">
          <AppWrapper otherHeight={otherHeight} icon={weather && (weather.current !== undefined) ? weather.current.weather[0].icon : ''} className="App">
            <MainSearchHome myCoords={myCoords} clearSearchHistory={clearSearchHistory} clearWeather={clearWeather} error={error} getMyWeather={getMyWeather} getWeather={getWeather} coords={props.coords} setParentValue={setValue} setParentCoords={setCoords} previousSearches={previousSearches}/>
          </AppWrapper>
        </Route>
        <Route path="/weather">
          <AppWrapper otherHeight={otherHeight} icon={weather && (weather.current !== undefined) ? weather.current.weather[0].icon : ''} className="App">
            <SmallHeaderSearch>
              <TitleWrapper style={{display: 'flex', flexDirection: 'column'}}>
                <StyledLink to='/'>
                  <SmallTitle>Weather</SmallTitle><SmallTitle>Report</SmallTitle>
                </StyledLink>
              </TitleWrapper>
              <SecondarySearch hidden={hideSearch} toggle={()=> setHideSearch(!hideSearch)} myCoords={myCoords} clearSearchHistory={clearSearchHistory} clearWeather={clearWeather} error={error} getMyWeather={getMyWeather} getWeather={getWeather} coords={props.coords} setParentValue={setValue} setParentCoords={setCoords} previousSearches={previousSearches}/>
            </SmallHeaderSearch>
            { weather && value ? <CurrentWeather place={place} weather={weather} /> : ''}
            { weather && value && forecasts.length ? <ForecastDays days={forecasts} offset={weather.timezone_offset} /> : ''}
          </AppWrapper>
        </Route>
      </Switch>
  )
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(App);
// export default App;
