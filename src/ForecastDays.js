import React, {useState, useEffect, useContext} from 'react'; 
import SingleDayForecast from './SingleDayForecast'
import styled from 'styled-components'

const ForeCastWrapper = styled.div`
display: flex;
flex-direction: row;
overflow-x: auto;
width: 100%;
min-height: 120px; //little more space
padding: 10px 0px;
`
 
const ForecastDays = (props)=> { 
  const listOfForecastDays = props.days.map((icon, i)=> (
    <SingleDayForecast icon={icon} />
  ))
  return ( 
     <ForeCastWrapper> 
       {listOfForecastDays}
     </ForeCastWrapper> 
  ) 
} 
export default ForecastDays;
