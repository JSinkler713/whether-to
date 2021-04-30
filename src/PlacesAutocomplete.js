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
import {ReactComponent as Close} from './assets/close.svg'
import {ReactComponent as GPS} from './assets/gps.svg'
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
const StyledClose = styled(Close)`
  path {
    fill: grey;
  }
  position: absolute;
  right: 10px;
  top: 0px;
  bottom: 0px;
  margin: auto;
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
const StyledGPS = styled(GPS)`
  margin-right: 4px;
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
const CurrentLocationBox = styled(ComboboxOption)`
  border-bottom: 2px solid black;
  margin: 0px 3px;
  display: flex;
  align-items: center;
`
const RecentSearchesLabelContainer = styled.li`
  text-decoration: none;
  height: 24px;
`
const RecentLocationLabelWrapper = styled.div`
  position: relative;
  height: 100%
  `
const RecentLocationLabel = styled.span`
  position: absolute;
  text-transform: uppercase;
  letter-spacing: -0.5px;
  top: 4px;
  margin-top: auto;
  margin-bottom: auto;
  font-size:14px;
  left: 5px;
  font-weight: 800;
`
const Clear = styled.span`
  position: absolute;
  margin: auto;
  font-size: 13px;
  top: 3px;
  cursor: pointer;
  right: 5px;
  font-weight: 400;
`



function PlacesAutocomplete({clearSearchHistory, clearWeather, myCoords, coords, error, getWeather, getMyWeather, setParentCoords, setParentValue , previousSearches}) {
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
  const handleClear = (e)=> {
    setValue('')
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
      setValue('')
      console.log(res)
      getWeather(myCoords.lat, myCoords.lng)//default uses coords
    } else {
      console.log('no coords yet')
    }
  }

  const handleSubmit = ()=> {
    console.log('in the submit')
    console.log('going to try getGeocode')
    getGeocode({ address : value })
      .then((res)=>{
        console.log('the first response, does it have address for zip?')
        console.log(res)
        console.log(res[0].formatted_address)
        setValue('')
        setParentValue(res[0].formatted_address)
        return getLatLng(res[0])
      })
      .then(({ lat, lng }) => {
        setParentCoords({ lat, lng })
        getWeather(lat,lng)
        console.log('this is what i got')
        console.log('lat and long', lat, lng)
      })
    //setParentValue( value, false )
  }

  const handleSelect = (val: string): void => {
    if (val !== 'Use current location') {
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
          getWeather(lat,lng)
          setValue('')
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
        <div style={{display: 'flex', position: 'relative'}}>
          <StyledClose onClick={handleClear}/>
          <SearchButtonWrapper onClick={handleSubmit}>
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
              { coords ?
                  (
                <CurrentLocationBox  onClick={handleCurrentLocation} value="Use current location">
                  <StyledGPS /> Use current location
                </CurrentLocationBox>
                  ): ''
              }
            </ComboboxList>
            <ComboboxList>{status === "OK" && renderSuggestions()}</ComboboxList>
            
            <ComboboxList>
              {!status && previousSearches.length > 1?
                (
              <RecentSearchesLabelContainer>
                <RecentLocationLabelWrapper>
                  <RecentLocationLabel>Recent Searches</RecentLocationLabel><Clear onClick={clearSearchHistory}>Clear</Clear>
                </RecentLocationLabelWrapper>
              </RecentSearchesLabelContainer>
                ) : ''
              }
              {!status && previousSearches.map((item, key)=> <ComboboxOption value={item} /> )}

            </ComboboxList>
         
          </ComboboxPopover>
        </StyledCombobox>
        </div>
      </div>
    </InitialSearchWrapper>
  );
}
export default PlacesAutocomplete
