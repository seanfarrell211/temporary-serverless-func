require('dotenv').config()
const Airtable = require('airtable-node');
 
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('appGsVXh5XoDKuAQc')
  .table('products')

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
            const {name,images,price,description,colors,company,stock,stars,reviews,category,shipping} = product.fields
            const image = images[0].url
            const result = {id,name,image,price,colors,company,stock,stars,reviews,category,shipping,description}
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
        const products = records.map((product) => {
            const{id} = product
            const {name,images,price,description,colors,company,stock,stars,reviews,category,shipping} = product.fields
            const image = images[0].url
            return {id,name,image,price,colors,company,stock,stars,reviews,category,shipping,description}
        })
        return {
            headers: {
                'Access-Control-Allow-Origin':'*',
            },
            statusCode: 200,
            body: JSON.stringify(products),
           
        }
    }catch(error){
        return {
            statusCode: 500,
            body: 'Server error',
        }
    }
}