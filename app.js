geocode = require('./util/geocode_api')
weather = require('./util/weather_api')



geocode("Lagos", (error, data) => {
    if (error) {
        console.log(error)
    } else {
        console.log(data.longitude)
        console.log(data.latitude)
        console.log(data.place_name)

        // callback
        weather(data.latitude, data.longitude, (error, data) => {
            if (error) {
                console.log(error);
            } else {
                console.log(data);
            }
        })
    }
})