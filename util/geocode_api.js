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

module.exports = geocode_cb;