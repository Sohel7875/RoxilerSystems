const mongoose = require('mongoose')
const seedData = require('../seed/seedData')

const dbConnection = async() =>{
try {
   const db = await mongoose.connect(process.env.DATABASE_CONNECTION_STRING,{ })
   if(db){
    //before running firstTime unComment the seetdData and store Product Data in MongoDb
    // seedData()
    console.log('Database connected')
   }
    
} catch (error) {
    console.log(error)
    process.exit(1)
}
}

module.exports = dbConnection
