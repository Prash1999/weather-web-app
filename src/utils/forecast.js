const request = require("request")
const forecast = (latitude,longitude,callback) => {
    const url = "http://api.weatherstack.com/current?access_key=2cd85212e50417d0e7558d553bdfc4b4&query="+latitude+","+longitude

    request({url, json :true}, (error, response) => { //see 5-es6-object.js , can use {body} instead of response 
            if(error){                                                            // as response is an object contains only body property
                    callback("Unable to connect to weather service", undefined)
            }
            else if(response.body.error){
                    callback("Unable to find location", undefined)
            }
            else{
                callback(undefined, ' It is currently ' + response.body.current.temperature + ' degress out. But feels like ' + response.body.current.feelslike + ' degrees and weather is '+ response.body.current.weather_descriptions[0] + ".")
                //     callback(undefined,{
                //             current_temp : response.body.current.temperature,
                //             feelslike_temp : response.body.current.feelslike,
                //             Weather_description : response.body.current.weather_descriptions[0]
                //     })
            }
    })
}

module.exports = forecast