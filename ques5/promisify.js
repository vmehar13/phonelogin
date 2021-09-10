const request = require('request')
const url = "http://www.google.com";

function getGoogleHomePage(url){
    return new Promise(
        (resolve, reject) => {
            request(url, function(error, response, body) {
                
                if(error){
                    console.error('error:', error)
                    reject(error)
                }

                console.log('body:', body)
                    resolve(body)
            })
    })
}

getGoogleHomePage(url).then(
    result => console.log(result)
).catch(
    error => console.log(error)
)