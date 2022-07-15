const request = require('request');

const forecast = (longitude, latitude, callback) => {
const url = `http://api.weatherstack.com/current?access_key=02c3ce3f10a48c806e978dae44543da7&query=${latitude},${longitude}&units=f`
    request({url, json: true}, (error, {body}) => {
        if(!body.current) {
            callback('No data', undefined);
            return;
        }  
        const temperature = body.current.temperature;
        const feels = body.current.feelslike;
        const description = body.current.weather_descriptions;
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        }
         else {
            callback(undefined, `its currently ${temperature} degress out there, it is ${description} and it feels like ${feels} degrees out.`)
        }
    })
}

module.exports = forecast