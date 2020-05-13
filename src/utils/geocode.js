const request = require("request")

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoicHJhc2gxOTk5IiwiYSI6ImNrOXR4NXVoMzFpamkza3FjeDA2bnNzNmIifQ.yuVPBmrG_v9Qt8OLW-xpBQ&limit=1"

    request({url, json : true}, (error, response) =>{   //see 5-es6-object.js , can use {body} instead of response
            if(error){
                    callback("Unable to connect to location service", undefined)
            }
            else  if(response.body.features.length == 0){
                    callback("Unable to find location. Try another search", undefined)
            }
            else {
                    callback(undefined,{
                             latitude : response.body.features[0].center[1],
                             longitude : response.body.features[0].center[0],
                             location : response.body.features[0].place_name
                    })
            }
    })


}

module.exports = geocode