const calculateBackground = (icon)=> {
    const table = {
        // clear sky
        '01d': `linear-gradient(180deg, #217CC0 0%, #74CCF2 85.5%)`,
        // clear sky night
        '01n': `linear-gradient(180deg, #001648 0%, #224677 100%)`,
        // clouds
        '02d': `linear-gradient(180deg, #C7CECE 0%, #8A9298 100%)`,
        '02n': `linear-gradient(180deg, #5B657E 0%, #1B2232 100%)`,
        '03d': `linear-gradient(180deg, #C7CECE 0%, #8A9298 100%)`,
        '03n': `linear-gradient(180deg, #5B657E 0%, #1B2232 100%)`,
        '04d': `linear-gradient(180deg, #C7CECE 0%, #8A9298 100%)`,
        '04n': `linear-gradient(180deg, #5B657E 0%, #1B2232 100%)`,
        //drizzle
        '09d': `linear-gradient(180deg, #F0F0F0 0%, #9B9B9B 100%)`,
        '09n': `linear-gradient(180deg, #5E7B7F 0%, #28414B 100%)`,
        // storm
        '11d': `linear-gradient(180deg, #999DAD 0%, #363A46 100%)`,
        '11n': `linear-gradient(180deg, #7B7180 0%, #000113 100%)`,

        // rain
        '10d': `linear-gradient(180deg, #50727E 0%, #BDCED8 100%)`,
        '10n': `linear-gradient(180deg, #556D85 0%, #1C2836 100%)`,
        
        // snow
        '13d': `linear-gradient(180deg, #50727E 0%, #BDCED8 100%)`,
        '13n': `linear-gradient(180deg, #3D668D 0%, #071B2F 100%)`,
        

        // fog and various mist same as rain for now
        '50d': `linear-gradient(180deg, #E7E6E9 0%, #C4C3C6 100%)`,
        '50d': `linear-gradient(180deg, #7C858C 0%, #272C2F 100%)`,
    }
    // if not in the table
    if (!table[icon]) {
        return `linear-gradient(180deg, #217CC0 0%, #74CCF2 85.5%)` //clear day default
    } else {
        return table[icon]
    }
}

export default calculateBackground
