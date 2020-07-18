const request = require('request');

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=735ed4f24551099f52a75376a90c716a&query=${long},${lat}&units=f`;
  request({
    url,
    json: true,
  }, (error, {body}) => {
    if (error) {
      callback(error, undefined);
    }else if(body.error) {
      callback('Unable to find location', undefined)
    }
    else {
      const {current: {weather_descriptions, temperature, feelslike}} = body;
      callback(undefined, `${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`)
    }

  })
}

module.exports = forecast;
