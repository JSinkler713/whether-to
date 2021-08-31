const colors = [`rgb(60, 130, 24)`, `rgb(117, 112, 34)`, `rgb(226, 137, 70)`, `rgb(216, 69, 51)`, `rgb(128,38, 74)`, `rgb(105, 29, 39)`]

const ranges = [ [0, 49], [50, 99], [100, 149], [150, 199], [200, 299], [300, 1000]]

const descriptions = [ 'good', 'ok', 'poor', 'bad', 'very bad', 'worst']

function getDescColor(aqi) {
  for (let i=0; i< ranges.length; i++) {
    if(aqi >= ranges[i][0] && aqi < ranges[i][1]) {
      return [descriptions[i], colors[i]]
    }
  }
  return 'no sensor data'
}

console.log(getDescColor(38))


async function fetchAQI(lat, lng) {
  let spaceAroundFactor = .1
  let nwLng = lng - spaceAroundFactor
  let nwLat = lat + spaceAroundFactor
  let seLng = lng + spaceAroundFactor
  let seLat = lat - spaceAroundFactor

  // outdoor sensors, .1 lat and lng around place coordinates
  let url=`https://api.purpleair.com/v1/sensors?nwlng=${nwLng}&nwlat=${nwLat}&selng=${seLng}&selat=${seLat}&location_type=0&fields=pm2.5_10minute,name,`

  let data = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key':`${process.env.REACT_APP_AQI_KEY}`
    }

  })
  data = await data.json()
  // data = [sensorID, PM2.5, name]
  const reducer = (accumulator, currentArr) => accumulator + currentArr[1]

  let sum = data.data.reduce(reducer, 0)
  let avg = Math.round(sum / data.data.length);
  // get avg
  console.log('***********************')
  console.log(data)
  console.log('SUM :', sum)
  console.log('AVG :', avg)
  const [description, color] = getDescColor(avg)
  console.log('description: ', description, 'color: ', color)
  console.log('***********************')
  return [avg, description, color]
}
export default fetchAQI
