import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import PlacesAutocomplete from './PlacesAutocomplete';
import fetchOneCall from './utils/fetchOneCall.js'

function App() {
  const [value, setValue] = useState('')
  const [coords, setCoords] = useState({ lat:null, lng:null })
  const [weather, setWeather] = useState({})
  const [previousSearches, setPreviousSearches] = useState([])

  useEffect(()=> {
    // on component load get the previous searches out of local storage
    setPreviousSearches( JSON.parse(localStorage.getItem('searches')) )
  }, [])

  useEffect(()=> {
    // when lat and lng update call our OneCallApi
    const getWeather = async()=> {
      let data = await fetchOneCall(coords.lat, coords.lng)
      setWeather(data)
    }
    getWeather()
  }, [coords])

  useEffect(()=> {
    // when a user enters a search save it to lacalstorage
    let searches = localStorage.getItem('searches')
    searches = JSON.parse(searches)
    if (searches && searches.length > 0) {
      searches = searches.filter((item)=> item!== value)
    } else {
      searches = []
    }
    const updatedSearches = [
      ...searches,
      value
    ]
    localStorage.setItem('searches', JSON.stringify(updatedSearches))
    setPreviousSearches(updatedSearches)
  }, [coords])

  return (
    <div className="App">
      <PlacesAutocomplete setParentValue={setValue} setParentCoords={setCoords} previousSearches={previousSearches}/>
    </div>
  );
}

export default App;
