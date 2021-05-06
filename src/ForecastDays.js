import React, {useState, useEffect, useContext} from 'react'; 
import SingleDayForecast from './SingleDayForecast'
import styled from 'styled-components'

const ForeCastWrapper = styled.div`
display: flex;
flex-direction: row;
overflow-x: auto;
width: 100%;
min-height: 125px; //little more space
margin-top: 5px; // adds space above forecast
padding: 15px 10px 15px 5px; 
`
 
const ForecastDays = (props)=> { 
  const listOfForecastDays = props.days.map((day, i)=> (
    <SingleDayForecast icon={day.weather[0].icon} sunrise={day.sunrise} offset={props.offset} high={day.temp.max} low={day.temp.min} allInfo={day}/>
  ))
  return ( 
     <ForeCastWrapper> 
       {listOfForecastDays}
     </ForeCastWrapper> 
  ) 
} 
export default ForecastDays;
