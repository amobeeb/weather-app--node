const request = require('request');

const geocode_cb = (place, callback) => {
    const geocode_url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(place)}.json?access_token=pk.eyJ1IjoiYW1vYmVlYiIsImEiOiJja3FicnZpNXYwOTFjMnZsZG1zb2FtOXZqIn0.cVrEkZVB1ZjXm6JKOB44wA`;

    request({ url: geocode_url, json: true }, (error, response) => {
        if (error) {
            callback("No internet connection", undefined)
        } else if (response.body.message === "Not Found") {
            callback("Unable to find searched location", undefined)
        } else if (response.body.features.length == 0) {
            callback("Unable to find searched location", undefined)
        } else {
            const long = response.body.features[4].geometry.coordinates[0];
            const lat = response.body.features[4].geometry.coordinates[1];
            const place_name = response.body.features[0].place_name;
            callback(undefined, {
                    longitude: long,
                    latitude: lat,
                    place_name: place_name
                })
                // weather(lat, long);
        }

    })
}

geocode_cb("Lagos", (error, data) => {
    if (error) {
        console.log(error)
    } else {
        console.log(data.longitude)
        console.log(data.latitude)
        console.log(data.place_name)
        weather(data.latitude, data.longitude, (error, data) => {
            if (error) {
                console.log(error);
            } else {
                console.log(data);
            }
        })
    }
})

weather = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=2d9fe361fa267bd2b0f9ad5b64bd58cd&query=${lat},${long}&units=f`;

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("No internet connection", undefined)
        } else if (response.body.error) {
            callback("Unable to find searched record", undefined)
        } else {
            const current = response.body.current;
            callback(undefined, `${current.weather_descriptions[0]}, It is currenly ${current.temperature} degrees out. There is a ${current.feelslike} `);
        }

    })
}