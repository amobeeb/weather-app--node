const request = require('request');
weather = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=2d9fe361fa267bd2b0f9ad5b64bd58cd&query=${lat},${long}&units=f`;
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("No internet connection", undefined)
        } else if (response.body.error) {
            callback("Unable to find searched record", undefined)
        } else {
            const current = response.body.current;
            callback(undefined, `${current.weather_descriptions[0]}, It is currenly ${current.temperature} degrees. Feels like ${current.feelslike} `);
        }

    })
}

module.exports = weather;