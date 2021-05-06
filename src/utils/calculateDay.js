const calculateDay = (sunrise, offset) => {
    let days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
    let date = new Date((sunrise + offset)*1000)
    return days[date.getDay()]
}

export default calculateDay