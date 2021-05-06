import React, {useState, useEffect, useContext} from 'react'; 
import calculateIcon from './utils/calculateIcon'
import styled from 'styled-components'
import { findByLabelText } from '@testing-library/dom';


const SingleDayWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const HighLowContainer = styled.div`
  display: flex;
  justify-content: center;
  font-family: Source Sans Pro, sans-serif;
  font-style: normal;
  font-weight: normal;
  margin-top: 3px;
  font-size: 16px;
  line-height: 20px;
`
const Seperator = styled.span`
  line-height: 26px;
  font-size: 18px;
  font-weight: 300;
  margin: -3px 2px 0px;
`
const IconWrapper = styled.div`
min-width: 60px;
margin: 0 20px;
display: flex;
align-items: center;
`

const SingleDayForecast = ({icon, high, low})=> { 
  return ( 
    <SingleDayWrapper>
     <IconWrapper> 
            <img src={calculateIcon(icon)} />
     </IconWrapper> 
     <HighLowContainer>{Math.round(high)}&#xb0; <Seperator> | </Seperator> {Math.round(low)}&#xb0;</HighLowContainer>
    </SingleDayWrapper>
  ) 
} 
export default SingleDayForecast;
