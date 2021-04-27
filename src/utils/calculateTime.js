const calculateTime = (dt, offset) => {
    let date = new Date((dt + offset)*1000)
    console.log('date', date)
    let midnightMarker = ''

    //let hour = date.split('T')[1].split(':')[0]
    let dateString = date.toISOString()
    let hour = dateString.split('T')[1].split('.')[0].split(':')[0]
    let minutes = dateString.split('T')[1].split('.')[0].split(':')[1] 
    console.log(hour)
    if (hour >= 12) {
        hour = hour % 12
        midnightMarker = 'pm'
    } else {
        midnightMarker = 'am'
    }
    let string =`as of ${hour}:${minutes} ${midnightMarker}`
    return string
}

export default calculateTime;