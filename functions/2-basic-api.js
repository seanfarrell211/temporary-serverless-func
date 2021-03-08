const items = require('../assets/data')

exports.handler = async (event,context,cb) => {
    return {
         headers: {
            'Access-Control-Allow-Origin': '*',
         }, // to let another file not in main file also working for its API / cors error
    statusCode: 200,
    body:JSON.stringify(items),
    }
}