geocode = require('./util/geocode_api')
weather = require('./util/weather_api')

const address = process.argv[2]

console.log(process.argv)


geocode(address, (error, {latitude, longitude, place_name}) => {
    if (error) {
        console.log(error)
    } else {
        
        console.log(longitude)
        console.log(latitude)
        console.log(place_name)

        // callback
        weather(latitude, longitude, (error, data) => {
            if (error) {
                console.log(error);
            } else {
                console.log(data);
            }
        })
    }
})