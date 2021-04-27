import { ChangeEvent, useState } from "react";
import usePlacesAutocomplete, {
  getLatLng, getGeocode } from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption
} from "@reach/combobox";
import styled from 'styled-components'
import "@reach/combobox/styles.css";

const InitialSearchWrapper = styled.div`
padding-top: 50px;
display: flex;
flex-direction: column;
align-items: center;
`

const StyledComboBoxInput = styled(ComboboxInput)`
 border: ${({error}) => (error ? `2px solid red`: `1px solid black`)};
 background: ${({error}) => (error ? `#FFD3D3`: '#FFFFFF')};
`
const TryAgainBox = styled.div`
  display: ${({error})=> (error ? 'block' : 'none')};
  color: white;
  font-size: 14px;
`



function PlacesAutocomplete({ error, getWeather, getMyWeather, setParentCoords, setParentValue , previousSearches}) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue
  } = usePlacesAutocomplete();
  const [focused, setFocused] = useState(false)

  const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
    setParentValue(e.target.value);
  };

  const handleFocus = (e)=> {
    console.log('it is focused')
    setFocused(true)
  }

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
    <InitialSearchWrapper>
      <div className='title-wrapper'>
        <h1 className="title">Weather Report</h1>
      </div>
      <p className="subtitle">Get the current weather and 5 day forecast</p>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <button onClick={getWeather}>Get Weather</button>
      <Combobox onSelect={handleSelect} openOnFocus={true} aria-labelledby="demo">
        <StyledComboBoxInput
          error={error}
          onFocus={handleFocus}
          style={{ width: 300, maxWidth: "90%" }}
          value={value}
          onChange={handleInput}
          disabled={!ready}
        />
        <TryAgainBox error={error}>
          Please Enter a valid location or postal code.
        </TryAgainBox>
        <ComboboxPopover >
          <ComboboxList>
            <ComboboxOption value="Use current location" />
          </ComboboxList>
          <ComboboxList>{status === "OK" && renderSuggestions()}</ComboboxList>
          <ComboboxList>{!status &&  previousSearches.map((item, key)=> <ComboboxOption value={item} /> )}</ComboboxList>
         
        </ComboboxPopover>
      </Combobox>
      </div>
    </InitialSearchWrapper>
  );
}
export default PlacesAutocomplete
