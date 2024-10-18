const axios = require('axios')
const productTransactionModel = require('../models/productTransaction.model')

const seeData = async() =>{
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json')
        if(!!response){
            await productTransactionModel.insertMany(response.data)
            console.log("Data is Seeded")
        }
       else{
        console.log('Something went wrong!')
       }

        
    } catch (error) {
        console.log(error)
    }
}

module.exports =seeData