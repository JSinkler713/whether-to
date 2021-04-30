import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import PlacesAutocomplete from './PlacesAutocomplete';
import { geolocated } from 'react-geolocated';
import fetchOneCall from './utils/fetchOneCall.js'
import CurrentWeather from './CurrentWeather';
import ForecastDays from './ForecastDays';
import styled from 'styled-components';
import calculateBackground from './utils/calculateBackground';

const AppWrapper = styled.div`
 background: ${({icon})=> calculateBackground(icon)};
`

function App(props) {
  const [value, setValue] = useState('')
  const [place, setPlace] = useState('')
  const [error, setError] = useState(false)
  const [coords, setCoords] = useState({ lat:null, lng:null })
  const [weather, setWeather] = useState(null)
  const [forecasts, setForecasts] = useState([])
  const [previousSearches, setPreviousSearches] = useState([])

  useEffect(()=> {
    // on component load get the previous searches out of local storage
    setPreviousSearches( JSON.parse(localStorage.getItem('searches')) )
  }, [])

    // when lat and lng update call our OneCallApi
  const getWeather = async()=> {
    let data = await fetchOneCall(coords.lat, coords.lng)
    console.log(data, 'data returned it is not liking')
    if (data === undefined) {
      // do some error handling
      setWeather(null)
    } else if (data.cod == '400') {
      setError(true)
      setWeather(null)
    } else {
      setPlace(value)
      setError(false)
      setWeather(data)
    }
  }

  useEffect(()=> {
    // when a user enters a search save it to lacalstorage
    console.log('the use effect with depend on coords is running')
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
  }, [coords])


  const getMyWeather = async ()=> {
      // this is to use current location from Geolocated App
      console.log('getting my own weather ', 'coords are', props.coords.latitude, props.coords.longitude)
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
  }, [getMyWeather])

  const clearWeather = ()=> {
    setWeather(null)
  }

  useEffect(()=> {
    //if weather updates, then update forecasts
    if (weather) {
      let days =[]
      weather.daily.forEach((day, i)=> {
        days.push(day.weather[0].icon)
      })
      console.log(days)
      setForecasts(days)
    }
  }, [weather])

  return (
    <AppWrapper icon={weather && (weather.current !== undefined) ? weather.current.weather[0].icon : ''} className="App">
      <PlacesAutocomplete clearSearchHistory={clearSearchHistory} clearWeather={clearWeather} error={error} getMyWeather={getMyWeather} getWeather={getWeather} coords={props.coords} setParentValue={setValue} setParentCoords={setCoords} previousSearches={previousSearches}/>
      { weather && value ? <CurrentWeather place={place} weather={weather} /> : ''}
      { weather && value && forecasts.length ? <ForecastDays days={forecasts}  /> : ''}
    </AppWrapper>
  );
}
export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(App);
// export default App;
