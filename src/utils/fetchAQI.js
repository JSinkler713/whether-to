async function fetchAQI(lat, lng) {
  let spaceAroundFactor = .1
  let nwLng = lng - spaceAroundFactor
  let nwLat = lat + spaceAroundFactor
  let seLng = lng + spaceAroundFactor
  let seLat = lat - spaceAroundFactor

  let url=`https://api.purpleair.com/v1/sensors?nwlng=${nwLng}&nwlat=${nwLat}&selng=${seLng}&selat=${seLat}&fields=pm2.5_10minute,name`

  let data = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key':`${process.env.REACT_APP_AQI_KEY}`
    }

  })
  data = await data.json()
  // get avg
  console.log('***********************')
  console.log(data)
  console.log('***********************')
}
export default fetchAQI
