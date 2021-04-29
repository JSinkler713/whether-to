import React, {useState, useEffect, useContext} from 'react'; 
import calculateIcon from './utils/calculateIcon'
import styled from 'styled-components'

const IconWrapper = styled.div`
min-width: 60px;
margin: 0 20px;
display: flex;
align-items: center;

`

const SingleDayForecast = ({icon})=> { 
  return ( 
     <IconWrapper> 
            <img src={calculateIcon(icon)} />
     </IconWrapper> 
  ) 
} 
export default SingleDayForecast;
