import clear from '../assets/01d.svg'
import cloud from '../assets/03.svg'
import rain from '../assets/09.svg'
import thunder from '../assets/11.svg'

const calculateIcon = (icon)=> {
  const table = {
    '01d': clear,
    '01n': clear,
    '02d': cloud,
    '02n': cloud,
    '03d': cloud,
    '03n': cloud,
    '04d': cloud,
    '04n': cloud,
    '09d': rain,
    '09n': rain,
    '10d': rain,
    '10n': rain,
    '50d': rain,
    '50n': rain,
    '11d': thunder,
    '11n': thunder,
    '13d': thunder,
    '13n': thunder,
  }
  if (table[icon]) {
    return table[icon]
  } else {
    return table['01d']
  }
}

export default calculateIcon

