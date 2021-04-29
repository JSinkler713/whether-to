import sun from '../assets/01d.svg'
import moon from '../assets/01n.svg'
import cloud from '../assets/03.svg'
import rain from '../assets/09.svg'
import thunder from '../assets/11.svg'
import snow from '../assets/13.svg'
import tornado from '../assets/Tornado.svg'

const calculateIcon = (icon)=> {
  const table = {
    '01d': sun,
    '01n': moon,
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
    '50d': tornado,
    '50n': tornado,
    '11d': thunder,
    '11n': thunder,
    '13d': snow,
    '13n': snow,
  }
  if (table[icon]) {
    return table[icon]
  } else {
    return table['01d']
  }
}

export default calculateIcon

