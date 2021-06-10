import calculateIcon from './utils/calculateIcon'
import styled from 'styled-components'
import calculateDay from './utils/calculateDay'

const SingleDayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (min-width: 700px) {
  min-width: calc(700px / 8);
  max-width: 125px;
  }
`
const HighLowContainer = styled.div`
  display: flex;
  justify-content: center;
  font-family: Source Sans Pro, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  @media (min-width: 700px) {
    font-size: 24px;
    line-height: 20px;
  }
`
const DayOfWeek = styled.p`
  letter-spacing: 1.1px;
  font-size: 16px;
  font-weight: 600;
  font-family: Source Sans Pro, sans-serif;
  @media (min-width: 700px) {
    font-size: 24px;
    line-height: 20px;
  }
`
const Seperator = styled.span`
  line-height: 26px;
  font-size: 18px;
  font-weight: 300;
  margin: -3px 2px 0px;
`
const IconWrapper = styled.div`
  min-width: 36px;
  margin: 0px 20px;
  display: flex;
  align-items: center;
  @media (min-width: 700px) {
    margin: 15px;
  }
`

const SingleDayForecast = ({icon, high, low, sunrise, offset})=> { 
  return ( 
    <SingleDayWrapper>
      <DayOfWeek>{calculateDay(sunrise, offset)}</DayOfWeek>
     <IconWrapper> 
            <img alt='weather-icon' src={calculateIcon(icon)} />
     </IconWrapper> 
     <HighLowContainer>{Math.round(high)}&#xb0; <Seperator> | </Seperator> {Math.round(low)}&#xb0;</HighLowContainer>
    </SingleDayWrapper>
  ) 
} 
export default SingleDayForecast;
