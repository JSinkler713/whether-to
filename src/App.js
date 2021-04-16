import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import PlacesAutocomplete from './PlacesAutocomplete';

function App() {
  const [value, setValue] = useState('')
  return (
    <div className="App">
      <PlacesAutocomplete setParentValue={setValue}/>
    </div>
  );
}

export default App;
