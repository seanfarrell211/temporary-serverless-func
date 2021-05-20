require('dotenv').config()
const Airtable = require('airtable-node');
 
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('appGsVXh5XoDKuAQc')
  .table('idea')

exports.handler = async (event, context, cb) => {
    console.log(event)
    const { id } = event.queryStringParameters
    console.log(id)
    if(id){
        try {
            const product = await airtable.retrieve(id)
            if(product.error){
                return {
                    statusCode: 404,
                    body:`No product with id: ${id}`,
                }
            }
            
            // const{id} = product
            const {name,images,desc1,header,desc2} = product.fields
            // const image = images[0].url
            const result = {id,name,images,desc1,header,desc2}
            return {
                headers: {
                    'Access-Control-Allow-Origin':'*',
                },
                statusCode:200,
                body: JSON.stringify(result),
            
            }
        }catch (error){
            return {
                statusCode: 500,
                body: error,
            }
        }
    }
    try {
        const {records} = await airtable.list()
        //console.log(records)
        const products_list = records.map((products) => {
            const{id} = products
            const {name,images,desc1,header,desc2} = products.fields
            const image = images[0].url
            return {id,name,image,desc1,header,desc2}
        })
        return {
            headers: {
                'Access-Control-Allow-Origin':'*',
            },
            statusCode: 200,
            body: JSON.stringify(products_list),
           
        }
    }catch(error){
        return {
            statusCode: 500,
            body: error,
        }
    }
}