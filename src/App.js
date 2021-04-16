import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import PlacesAutocomplete from './PlacesAutocomplete';
import fetchOneCall from './utils/fetchOneCall.js'

function App() {
  const [value, setValue] = useState('')
  const [coords, setCoords] = useState({ lat:null, lng:null })
  const [weather, setWeather] = useState('')

  useEffect(()=> {
    //when lat and lng update call our OneCallApi
    fetchOneCall(coords.lat, coords.lng)

  }, [coords])

  return (
    <div className="App">
      <PlacesAutocomplete setParentValue={setValue} setParentCoords={setCoords}/>
    </div>
  );
}

export default App;
