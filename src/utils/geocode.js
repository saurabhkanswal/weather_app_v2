const request = require('request')

const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1Ijoic2F1cmFiaGthbnN3YWwiLCJhIjoiY2p4azY0cWVwMjc4dDNubWpjMGRmNXdwdiJ9.GLVrDT7qog4BiYx7lYfw2w'
    request({url:url, json:true},(error,response)=>{
        if(error){
            callback('unable to connect mapbox api. check your internet connection')
        }else if(response.body.features.length === 0){
            callback('unable to find location! Try another search')
        }else{
            callback(undefined,{
                latitude: response.body.features[0].center[1],
            longitude: response.body.features[0].center[0],
            location: response.body.features[0].place_name
            })
            

        }
    })
}

module.exports= geocode;