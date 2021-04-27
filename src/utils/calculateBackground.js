const calculateBackground = (icon)=> {
    const table = {
        // clear sky
        '01d': `linear-gradient(180deg, #217CC0 0%, #74CCF2 85.5%)`,
        // clear sky night
        '01n': `linear-gradient(180deg, #001648 0%, #224677 100%)`,
        // clouds
        '02d': `linear-gradient(180deg, #C7CECE 0%, #8A9298 100%)`,
        '03d': `linear-gradient(180deg, #C7CECE 0%, #8A9298 100%)`,
        '04d': `linear-gradient(180deg, #C7CECE 0%, #8A9298 100%)`,
        // storm
        '11d': `linear-gradient(180deg, #999DAD 0%, #363A46 100%)`,
        // rain
        '10d': `linear-gradient(180deg, #50727E 0%, #BDCED8 100%)`,
        '13d': `linear-gradient(180deg, #50727E 0%, #BDCED8 100%)`,
        '9d': `linear-gradient(180deg, #50727E 0%, #BDCED8 100%)`,
    }
    // if not in the table
    if (!table[icon]) {
        return `linear-gradient(180deg, #217CC0 0%, #74CCF2 85.5%)` //clear day default
    } else {
        return table[icon]
    }
}

export default calculateBackground