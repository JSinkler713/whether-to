const fetchOneCall = async(lat, lng)=> {
  console.log('fetching weather')
  let result = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
  result = await result.json()
  return result
}
export default fetchOneCall

