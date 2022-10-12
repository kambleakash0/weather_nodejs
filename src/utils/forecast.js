const request = require('postman-request')

const forecast = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=453f3c2f4f9b973c0e7da1dc98122e4c&query=' + encodeURIComponent(address)

    request({url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to the API!', undefined)
        } else if (body.success === false) {
            callback('Unable to find location. Try again.', undefined)
        } else {
            callback(undefined, {
                location: body.request.query, 
                weather: body.current.weather_descriptions[0],
                temp: body.current.temperature,
                feelslike: body.current.feelslike,
                icon: body.current.weather_icons[0]
            })
        }
    })
}

module.exports = forecast