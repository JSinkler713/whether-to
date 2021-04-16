import { ChangeEvent } from "react";
import usePlacesAutocomplete, {
  getLatLng, getGeocode } from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption
} from "@reach/combobox";

import "@reach/combobox/styles.css";

function PlacesAutocomplete({ setParentCoords, setParentValue }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue
  } = usePlacesAutocomplete();

  const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
    setParentValue(e.target.value);
  };

  const handleSelect = (val: string): void => {
    setValue(val, false);
    setParentValue(val, false);

    console.log('***********************')
    console.log(val)
    console.log('***********************')
    // assuming they just chose a location
    getGeocode({ address : val })
      .then((res)=> getLatLng(res[0]))
      .then(({ lat, lng }) => {
        setParentCoords({ lat, lng })
        console.log("The coordinates are")
        console.log("Latitude: ", lat)
        console.log("Longitude: ", lng)
      })

  };

  const renderSuggestions = (): JSX.Element => {
    const suggestions = data.map(({ place_id, description }: any) => (
      <ComboboxOption key={place_id} value={description} />
    ));

    return (
      <>
        {suggestions}
        <li className="logo">
          <img
            src="https://developers.google.com/maps/documentation/images/powered_by_google_on_white.png"
            alt="Powered by Google"
          />
        </li>
      </>
    );
  };

  return (
    <div className="App">
      <h1 className="title">Weather</h1>
      <p className="subtitle">Get the current weather and 5 day forecast</p>
      <Combobox onSelect={handleSelect} aria-labelledby="demo">
        <ComboboxInput
          style={{ width: 300, maxWidth: "90%" }}
          value={value}
          onChange={handleInput}
          disabled={!ready}
        />
        <ComboboxPopover>
          <ComboboxList>{status === "OK" && renderSuggestions()}</ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
export default PlacesAutocomplete
