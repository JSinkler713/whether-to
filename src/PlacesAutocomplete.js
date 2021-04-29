import { ChangeEvent, useState } from "react";
import usePlacesAutocomplete, {
  getLatLng, getGeocode } from "use-places-autocomplete";
// trying this out
// import CurrentLocation from 'react-current-location-address'
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption
} from "@reach/combobox";
import {ReactComponent as Search} from './assets/search.svg'
import styled from 'styled-components'
import "@reach/combobox/styles.css";
const API_KEY = process.env.REACT_APP_LAT_LNG_API

const InitialSearchWrapper = styled.div`
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const StyledSearchSVG = styled(Search)`
  path {
    fill: white;
  }
`
const StyledComboBoxInput = styled(ComboboxInput)`
  width: 100%;
  min-width: 200px;
  min-height: 24px;
  border-radius: 18px;
  padding: 5px;
  border: ${({error}) => (error ? `2px solid red`: `1px solid black`)};
  background: ${({error}) => (error ? `#FFD3D3`: '#FFFFFF')};
`
const StyledCombobox = styled(Combobox)`
  display: flex;
  justify-content: start;
`
const TryAgainBox = styled.div`
  display: ${({error})=> (error ? 'block' : 'none')};
  color: white;
  font-size: 14px;
`
const SearchButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 50%;
`



function PlacesAutocomplete({clearWeather, coords, error, getWeather, getMyWeather, setParentCoords, setParentValue , previousSearches}) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue
  } = usePlacesAutocomplete();
  const [focused, setFocused] = useState(false)

  const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
    setParentValue(value)
  };

  const handleFocus = (e)=> {
    console.log('it is focused')
    setFocused(true)
  }

  const handleCurrentLocation = async(e)=> {
    // choosing use current location
    console.log('handle current location')
    if (coords) {
      let res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${API_KEY}`)
      res = await res.json()
      let place = res.results[0].formatted_address.split(',')
      let city = place[1].trim()
      let stateAndZip = place[2].trim()
      let country = place[3].trim()
      let myValue = `${city}, ${stateAndZip}, ${country}`
      console.log(city, stateAndZip, country)
      setParentValue( myValue )
      console.log(res)
      getMyWeather()
    } else {
      console.log('no coords yet')
    }
  }

  const handleSubmit = ()=> {
    setParentValue( value, false )
  }

  const handleSelect = (val: string): void => {
    if (val !== 'Use current location') {
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
    } else {
      handleCurrentLocation()
    }
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
        <div style={{display: 'flex'}}>
          <SearchButtonWrapper onClick={getWeather}>
              <StyledSearchSVG />
          </SearchButtonWrapper>
          <StyledCombobox onSelect={handleSelect} openOnFocus={true} aria-labelledby="demo">
          <StyledComboBoxInput
            error={error}
            onFocus={handleFocus}
            value={value}
            onChange={handleInput}
            disabled={!ready}
          />
          <TryAgainBox error={error}>
            Please Enter a valid location or postal code.
          </TryAgainBox>
          <ComboboxPopover >
            <ComboboxList>
              <ComboboxOption  value="Use current location" />
            </ComboboxList>
            <ComboboxList>{status === "OK" && renderSuggestions()}</ComboboxList>
            <ComboboxList>{!status &&  previousSearches.map((item, key)=> <ComboboxOption value={item} /> )}</ComboboxList>
         
          </ComboboxPopover>
        </StyledCombobox>
        </div>
      </div>
    </InitialSearchWrapper>
  );
}
export default PlacesAutocomplete
