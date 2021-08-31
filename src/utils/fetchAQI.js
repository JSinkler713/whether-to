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
  console.log('***********************')
  return avg
}
export default fetchAQI
