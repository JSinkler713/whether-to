import { ChangeEvent, useState, useEffect, useRef } from "react";
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
import { useSpring, animated, config } from 'react-spring';

const StyledForm = styled.form`
  display: flex;
  position: absolute;
  top: 13px;
  right: 20px;
  @media (min-width: 700px) {
    top: 30px;
    right: 20px;
  }
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
  position: relative;
  display: ${({hidden}) => ( hidden ? 'none' : 'block')};
  top: 0px;
  bottom: 0px;
  margin: auto;
`
const StyledComboBoxInput = styled(ComboboxInput)`
  width:  100%;
  display: ${({hidden}) => ( hidden ? 'none' : 'block')};
  min-width: 200px;
  min-height: 24px;
  /*Does this stop auto phone zoom? */
  /* YES! */
  font-size: 16px;
  border-radius: 18px;
  padding: 5px;
  border: ${({error}) => (error ? `2px solid red`: `0px solid black`)};
  background: ${({error}) => (error ? `#FFD3D3`: '#FFFFFF')};
`
const StyledCombobox = styled(Combobox)`
  width: ${({hidden}) => ( hidden ? '0%' : '100%')};
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
  font-size: 14px;
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


function SecondarySearch({clearSearchHistory, clearWeather, myCoords, coords, error, getWeather, getMyWeather, setParentCoords, setParentValue , previousSearches}) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue
  } = usePlacesAutocomplete();

  const [hidden, setHidden] = useState(true)

  const inputEl = useRef(null);
  const onSearchClickOrPress = () => {
    inputEl.current.focus();
  };

  const searchSlide = useSpring({ width: hidden ? '0px' : '200px', opacity: hidden ? 0 : 1})
  const squeezeShut = useSpring({ 
    config: config.slow,
    width: hidden ? '0px' : '18px',
    opacity: hidden ? '0' : '1',
  })

  const toggle = ()=> {
    setHidden(!hidden)
  }
  const handlePressClose = (e)=> {
    if (!hidden) { 
      toggle() 
    }
  }

  const handlePressSearch = (e)=> {
    if (hidden) { 
      toggle() 
      //onSearchClickOrPress()  
    } else { 
      handleSubmit(e);
    }
  }
  useEffect(()=> {
    const timer = setTimeout(()=> {
    onSearchClickOrPress()
    }, 1000)
    return () => {
      clearTimeout(timer)
    }
  }, [toggle])


  const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
    // setParentValue(value) got confusing with it changing before weather fetched
  };

  const handleClear = (e)=> {
    setValue('')
  }

  const handleCurrentLocation = async(e)=> {
    // choosing use current location
    if (coords) {
      let res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${process.env.REACT_APP_LAT_LNG_API}`)
      res = await res.json()
      let place = res.results[0].formatted_address.split(',')
      let city = place[1].trim()
      let stateAndZip = place[2].trim()
      let country = place[3].trim()
      let myValue = `${city}, ${stateAndZip}, ${country}`
      //setValue( myValue )
      setParentValue( myValue )
      getWeather(myCoords.lat, myCoords.lng)//default uses coords
    } else {
    }
  }

  const handleSubmit = (e)=> {
    e.preventDefault()
    getGeocode({ address : value })
      .then((res)=>{
        setValue(res[0].formatted_address)
        setParentValue(res[0].formatted_address)
        return getLatLng(res[0])
      })
      .then(({ lat, lng }) => {
        setParentCoords({ lat, lng })
        getWeather(lat,lng)
      })
    //setParentValue( value, false )
  }

  const handleSelect = (val: string): void => {
    if (val !== 'Use current location') {
      setValue(val)
      setParentValue(val, false);
      // assuming they just chose a location
      getGeocode({ address : val })
        .then((res)=> getLatLng(res[0]))
        .then(({ lat, lng }) => {
          setParentCoords({ lat, lng })
          getWeather(lat,lng)
        })
    } else {
      handleCurrentLocation()
    }
  };

  useEffect(()=> {
    if (!hidden && value) {
      const timeOutRef = setTimeout(()=> {
        setValue('')
        toggle()
      }, 1000)
      return ()=> clearTimeout(timeOutRef)
    }
  },[ getWeather ]) //eslint-disable-line react-hooks/exhaustive-deps


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

  return(
    <StyledForm onSubmit={handleSubmit}>
          <SearchButtonWrapper tabIndex="0" onKeyPress={handlePressSearch} onClick={(e)=> hidden ? toggle() : handleSubmit(e)}>
              <StyledSearchSVG />
          </SearchButtonWrapper>
          <animated.div style={searchSlide}>
          <StyledCombobox  onSelect={handleSelect} hidden={hidden} openOnFocus={true} aria-labelledby="demo">
            
          <StyledComboBoxInput
            id='hello'
            ref={inputEl}
            hidden={hidden}
            error={error}
            value={value}
            onChange={handleInput}
            disabled={!ready}
          />
          <animated.span style={{
            position: 'absolute',
            right: '10px',
            top: '7px',
            ...squeezeShut}}>
            <StyledClose hidden={hidden} tabIndex="0" onKeyPress={handlePressClose} onSubmit={()=> {handleClear(); toggle();}} onClick={()=> {handleClear(); toggle();}}/>
          </animated.span>
          <TryAgainBox error={error}>
            Please Enter a valid location or postal code.
          </TryAgainBox>
          <ComboboxPopover >
            <ComboboxList>
              { coords ?
                  (
                <CurrentLocationBox onClick={handleCurrentLocation} value="Use current location">
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
        </animated.div>
        </StyledForm>
  )
}

export default SecondarySearch
